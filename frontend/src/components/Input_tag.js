import React, { useState } from "react";

const inputStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "400px",
  height: "50px",
  border: "1px solid #dcdcdc",
  borderRadius: "5px",
  margin: "10px",
};

const tagStyle = {
  marginLeft: "10px",
  display: "flex",
  maxWidth: "400px",
  flexWrap: "wrap",
  color: "#8d8d8d",
  gap: "10px",
};

const errorMessageStyle = {
  color: "red",
  marginTop: "5px",
  marginLeft: "10px",
  marginBottom: "5px",
};

function InputTag({ onChange, required = false }) {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [error, setError] = useState("");

  const regex = /[!@#$%^&*(),.?":{}|<>]/;

  const handleChange = (event) => {
    const value = event.target.value;
    // 공백, 특수문자 입력시 에러메세지
    if (/\s/.test(value)) {
      setError("공백은 사용할 수 없습니다.");
      return;
    } else if (regex.test(value)) {
      setError("특수문자는 사용할 수 없습니다.");
      return;
    }

    setError("");
    setInputValue(value);
  };

  const handleKeyDown = (e) => {
    // 공백 입력 방지
    if (e.key === " " && !isComposing) {
      e.preventDefault();
      setError("공백은 사용할 수 없습니다.");
      return;
    }

    if (e.key !== "Enter" || isComposing) {
      return;
    }

    const value = e.target.value.trim();
    if (!value) return;

    // 중복 태그 입력 방지
    if (tags.includes(value)) {
      setError("중복된 태그입니다.");
      setInputValue("");
      return;
    }

    setTags([...tags, value]);
    setInputValue("");
    onChange([...tags, value]);
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (e) => {
    setIsComposing(false);
    handleKeyDown(e);
  };

  const removeTag = (tagIdx) => {
    const newTags = tags.filter((_, idx) => idx !== tagIdx);
    setTags(newTags);
    onChange(newTags);
  };

  return (
    <>
      <input
        style={inputStyle}
        className="tag"
        id="tag"
        placeholder="  태그 입력 후 Enter"
        type="text"
        onChange={handleChange}
        value={inputValue}
        required={required}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      {error && <div style={errorMessageStyle}>{error}</div>}
      <div style={tagStyle}>
        {tags.map((tag, idx) => (
          <div key={idx}>
            <span>#{tag}</span>
            <span onClick={() => removeTag(idx)} style={{ color: "#B8B8B8" }}>
              &nbsp;&times;
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default InputTag;
