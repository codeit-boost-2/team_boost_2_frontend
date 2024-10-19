import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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


function EditReplyPopup({ comments, setModal }) {
  const [nickname, setNickname] = useState(comments.nickname);
  const [content, setContent] = useState(comments.content);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onClose = () =>{
    setModal(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nickname", nickname);
    formData.append("content", content);
    formData.append("password", password);


    axios
      .put(
        `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/comments/${comments.id}`,
        {
          nickname,
          content,
          password,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("수정에 성공했습니다!");
          onClose();
          navigate(0);
        }
      })
      .catch((error) => {

        if (error.response.status === 404) {
          alert(error.status);
          console.log(error);
          onClose();
          navigate(0);
        } else {
          alert("error.status: ", error.status);
          console.log(error);
          onClose();
          navigate(0);
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
