import React from "react";

const ColorPalette = ({ colors, onSelectColor }) => {
  return (
    <div className="color-palette">
      {colors.map((color, index) => (
        <div
          key={index}
          className="color-swatch"
          style={{ backgroundColor: color }}
          onClick={() => onSelectColor(color)}
        ></div>
      ))}
    </div>
  );
};

export default ColorPalette;
