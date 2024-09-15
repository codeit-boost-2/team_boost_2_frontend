import React, { useState } from "react";
import "./Edit_reply_popup.css";

const inputStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "400px",
  height: "40px",
  border: "1px solid #dcdcdc",
  borderRadius: "5px",
  marginTop: "10px",
};

const inputContentStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "400px",
  height: "160px",
  border: "1px solid #dcdcdc",
  borderRadius: "5px",
  marginTop: "10px",
};

function EditReplyPopup({ onClose }) {
  const [values, setValues] = useState({
    name: "",
    content: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 폼 유효성 검사
  const validateForm = () => {
    const requiredFields = ["name", "content", "password"];
    for (let field of requiredFields) {
      if (!values[field]) {
        alert("내용을 입력해 주세요.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log({ values });
      onClose();
    }
  };
  return (
    <div className="EditPopupOverlay">
      <div className="EditPopup">
        <button className="Cancel-button" onClick={onClose}>
          X
        </button>
        <div>
          <h2 className="EditPopup-title">댓글 수정</h2>
          <div className="EditPopup-inner">
            <div>
              닉네임
              <input
                style={inputStyle}
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="닉네임을 입력해 주세요."
                required
              />
            </div>
            <div>
              본문
              <textarea
                style={inputContentStyle}
                name="content"
                value={values.content}
                onChange={handleChange}
                placeholder="댓글을 입력해 주세요."
                required
              />
            </div>
            <div>
              비밀번호
              <input
                style={inputStyle}
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력해 주세요."
                required
              />
            </div>
          </div>
          <button className="Edit-button" onClick={handleSubmit}>
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditReplyPopup;
