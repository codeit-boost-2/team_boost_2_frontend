import React, { useState } from "react";
// import { postReply } from "../api/api.js";
import { useParams } from "react-router-dom";
import axios from "axios";
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

function ReplyMemoryPopup({ onClose }) {
  const { MemoryId } = useParams();
  const [values, setValues] = useState({
    nickname: "",
    content: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { nickname, content, password } = values;

    const formData = new FormData();
    //formData.append("memoryId", memoryId);
    formData.append("nickname", nickname);
    formData.append("content", content);
    formData.append("password", password);

    // 콘솔에 출력
    console.log("Form submitted:", {
      MemoryId,
      nickname,
      content,
      password: password,
    });

    axios
      .post(
        `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/${MemoryId}/comments`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        onClose();
      })
      .catch((error) => {
        if (error.response) {
          console.log("서버 응답 오류:", error.response.status);
        } else if (error.request) {
          console.log("오류", error.request); // 요청은 보내졌지만 응답을 받지 못한 경우
        } else {
          console.log("기타 오류:", error.message);
        }
      });
  };

  return (
    <div className="ReplyPopupOverlay">
      <div className="ReplyPopup">
        <button className="Cancel-button" onClick={onClose}>
          X
        </button>
        <div>
          <h2 className="ReplyPopup-title">댓글 등록</h2>
          <form className="ReplyPopup-inner">
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
                name="content"
                placeholder="댓글을 입력해주세요."
                value={values.content}
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
          </form>

          <button className="Reply-button" onClick={handleSubmit}>
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReplyMemoryPopup;
