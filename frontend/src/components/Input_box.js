import React from "react";
import "./Input_box.css";

function InputBox({ label, value, onChange, required = false }) {
  return (
    <div>
      <label>{label}</label>
      <textarea
        className="boxStyle"
        type="text"
        placeholder="그룹을 소개해 주세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}

export default InputBox;
