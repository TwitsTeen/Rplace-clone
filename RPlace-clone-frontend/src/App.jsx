import { useState, useEffect } from "react";
import Grid from "./Grid";
import ColorPalette from "./ColorPalette";
import "./App.css";

function App() {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [grid, setGrid] = useState();
  const [delayListIndicator, setDelayListIndicator] = useState(
    "You are not on delay list"
  );
  const serverURL = "http://localhost:3000";

  async function getData() {
    try {
      const response = await fetch(`${serverURL}/grid`);
      if (!response.ok) {
        throw new Error("Failed to fetch grid data");
      }

      const json = await response.json();
      setGrid(json);
    } catch (error) {
      console.error(error);
    }
    isOnDelayList();
  }

  async function isOnDelayList() {
    try {
      const response = await fetch(`${serverURL}/delay`);
      if (!response.ok) {
        throw new Error("Failed to fetch grid data");
      }
      const json = await response.json();

      setDelayListIndicator(json.message);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
    const intervalId = setInterval(getData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#000000",
    "#FFFFFF",
  ];

  return (
    <div className="App">
      <ColorPalette colors={colors} onSelectColor={setSelectedColor} />
      <div>{delayListIndicator}</div>
      <Grid
        grid={grid}
        setGrid={setGrid}
        selectedColor={selectedColor}
        getData={getData}
        serverURL={serverURL}
      />
    </div>
  );
}

export default App;
