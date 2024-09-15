import React from "react";
import "./Input_password.css";

function InputPW({ label, value, onChange, required = false }) {
  return (
    <div>
      <label>{label}</label>
      <input
        className="password"
        placeholder="비밀번호를 입력해 주세요"
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}

export default InputPW;
