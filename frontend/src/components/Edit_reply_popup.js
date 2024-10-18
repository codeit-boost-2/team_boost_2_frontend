import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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

function EditReplyPopup({ comments, index, onClose }) {
  const { MemoryId } = useParams();

  const [nickname, setNickname] = useState(comments[index].nickname);
  const [content, setContent] = useState(comments[index].content);
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nickname", nickname);
    formData.append("content", content);
    formData.append("password", password);
    for (const x of formData) {
      console.log(x);
    }

    axios
      .put(
        `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/comments/${MemoryId}`,
        { formData }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("수정에 성공했습니다!");
          onClose();
        }
      })
      .catch((error) => {
        if (error.response) {
          // 서버가 응답했지만, 4xx나 5xx 에러인 경우
          if (error.response.status === 404) {
            alert("해당 댓글을 찾을 수 없습니다.");
            console.log(error);
          } else if (error.response.status === 500) {
            alert("서버에서 문제가 발생했습니다.");
            console.log(error);
          } else {
            alert("오류가 발생했습니다. 상태 코드: " + error.response.status);
            console.log(error);
          }
        } else if (error.request) {
          // 요청은 서버로 전송되었으나, 응답을 받지 못한 경우
          alert("서버로부터 응답이 없습니다. 다시 시도해 주세요.");
          console.log(error);
        } else {
          // 요청 설정 자체에서 문제가 있는 경우
          alert("요청을 보내는 중 문제가 발생했습니다: " + error.message);
          console.log(error);
        }
      });
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
                name="nickname"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
                placeholder="닉네임을 입력해 주세요."
                required
              />
            </div>
            <div>
              본문
              <textarea
                style={inputContentStyle}
                name="content"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                placeholder="댓글을 입력해 주세요."
                required
              />
            </div>
            <div>
              수정권한 인증
              <input
                type="password"
                style={inputStyle}
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
