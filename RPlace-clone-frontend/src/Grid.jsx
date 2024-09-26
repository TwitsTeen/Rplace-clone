import { useState } from "react";

const Grid = ({ size, selectedColor }) => {
  const [grid, setGrid] = useState(Array(size * size).fill("#FFFFFF"));

  const handleCellClick = (index) => {
    const newGrid = [...grid];
    newGrid[index] = selectedColor;
    setGrid(newGrid);
  };

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
