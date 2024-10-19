import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Delete_reply_popup.css";

function DeleteReplyPopup({ id, setModal }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const onClose = () =>{
    setModal(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/comments/${id}`;
    console.log(password);
    axios
      .delete(url, {
        data: {
          password: password,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("삭제에 성공했습니다!");
          onClose();
          navigate(0);
        }
      })
      .catch((error) => {
        if (error.status === 403) {
          alert("잘못된 비밀번호 입니다.");
        } else if ((error.message = "Network Error")) {
          alert(error.status);
          console.log(error);
          navigate("/Error");
        } else {
          alert(error);
          console.log(error);
          navigate(0);
        }
      });
  };

  return (
    <div className="DeletePopupOverlay">
      <div className="DeletePopup">
        <button className="Cancel-button" onClick={onClose}>
          X
        </button>

          <h2 className="DeletePopup-title">댓글 삭제</h2>
          <div className="DeletePopup-inner">
            <p>삭제 권한 인증</p>
            <input
              className="Password-input"
              type="password"
              value={password}
              style={{marginBottom: '40px'}}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요."
            />
        <button className="submitButton"  onClick={handleSubmit}>
          삭제하기
        </button>
          </div>

      </div>
    </div>
  );
}

export default DeleteReplyPopup;
