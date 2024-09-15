import React from "react";
import "./Toggle.css";

function Toggle({ isPublic, onToggle }) {
  return (
    <div className="PublicOption">
      <div className="toggle">
        <span className="privacy-label">{isPublic ? "공개" : "비공개"}</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => onToggle(!isPublic)}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default Toggle;
