import React, { useState } from "react";
import Grid from "./Grid";
import ColorPalette from "./ColorPalette";
import "./App.css";

function App() {
  const [selectedColor, setSelectedColor] = useState("#000000");
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
      <Grid size={50} selectedColor={selectedColor} />
    </div>
  );
}

export default App;
