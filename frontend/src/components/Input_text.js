import React, { useState } from "react";
import "./Input_text.css";

function InputText({ label, value, onChange, required = false }) {
  const [error, setError] = useState("");

  // 규칙 검사 함수
  const validateInput = (inputValue) => {
    const validPattern = /^[a-zA-Z0-9ㄱ-ㅎ가-힣!@#$%^_]*$/; // 허용된 특수문자
    if (!validPattern.test(inputValue)) {
      setError("특수문자는 !@#$%^_만 사용하실 수 있습니다.");
    } else {
      setError("");
    }
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
    validateInput(newValue);
  };

  return (
    <div>
      <label>
        {label}
        <input
          className="textInput"
          type="text"
          placeholder="그룹명을 입력해주세요"
          value={value}
          onChange={handleChange}
          required={required}
        />
      </label>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default InputText;
