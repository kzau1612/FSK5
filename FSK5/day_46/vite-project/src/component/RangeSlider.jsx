import { useState } from "react";

function RangeSlider({ value, handleChange, theme }) {
  return (
    <div className="range-slider">
      <span className="value-display" style={{ color: theme === "light" ? "black" : "white" }}>
        {value}
      </span>
      <input type="range" min="1" max="1000" value={value} onChange={handleChange} />
      <span className="value-100">100</span>
      <span className="value-400">400</span>
      <span className="value-700">700</span>
      <span className="value-1000">1000</span>
    </div>
  );
}

export default RangeSlider;
