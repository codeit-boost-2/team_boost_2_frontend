import React, { useState } from "react";
import "./Reply_popup.css";

const inputStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "400px",
  height: "45px",
  border: "1px solid #dcdcdc",
  borderRadius: "5px",
  marginTop: "10px",
};

function ReplyMemoryPopup({ onClose, onChange }) {
  const [values, setValues] = useState({
    nickname: "",
    replyContent: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    onChange({ ...values, [name]: value });
  };

  const handleSubmit = () => {
    console.log({ values });
    onClose(); // 팝업 닫기
  };

  return (
    <div className="ReplyPopupOverlay">
      <div className="ReplyPopup">
        <button className="Cancel-button" onClick={onClose}>
          X
        </button>
        <div>
          <h2 className="ReplyPopup-title">댓글 등록</h2>
          <div className="ReplyPopup-inner">
            <div className="Reply-nickname">
              <p>닉네임</p>
              <input
                style={inputStyle}
                type="text"
                name="nickname"
                placeholder="닉네임을 입력해주세요"
                value={values.nickname}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="Reply-content">
              <p>댓글</p>
              <textarea
                style={inputStyle}
                type="text"
                name="replyContent"
                placeholder="댓글을 입력해주세요."
                value={values.replyContent}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="Reply-PW">
              <p>비밀번호</p>
              <input
                style={inputStyle}
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력해 주세요."
                required={true}
              />
            </div>
          </div>

          <button className="Reply-button" onClick={handleSubmit}>
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReplyMemoryPopup;
