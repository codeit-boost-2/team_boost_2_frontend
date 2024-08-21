import React from "react";
import "./Toggle.css";

function Toggle({ isPrivate, onToggle }) {
  return (
    <div className="privateOption">
      <div>그룹 공개 선택</div>
      <div className="toggle">
        <span className="privacy-label">{isPrivate ? "비공개" : "공개"}</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={!isPrivate}
            onChange={() => onToggle(!isPrivate)}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default Toggle;
