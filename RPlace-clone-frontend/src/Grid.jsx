import { useState } from "react";

const Grid = ({ grid, setGrid, selectedColor, getData, serverURL }) => {
  const handleCellClick = (index) => {
    fetch(`${serverURL}/grid/${index}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ color: selectedColor }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error))
      .finally(() => getData());
  };

  const size = grid ? Math.sqrt(grid.length) : 0;

  if (!grid) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${size}, 20px)`,
        gridTemplateRows: `repeat(${size}, 20px)`,
      }}
    >
      {grid.map((color, index) => (
        <div
          key={index}
          className="cell"
          style={{ backgroundColor: color }}
          onClick={() => handleCellClick(index)}
        ></div>
      ))}
    </div>
  );
};

export default Grid;
