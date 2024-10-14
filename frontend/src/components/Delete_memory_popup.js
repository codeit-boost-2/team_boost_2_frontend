import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Delete_memory_popup.css";

function DeleteMemoryPopup({ onClose }) {
  const navigate = useNavigate();
  const { MemoryId } = useParams();
  const [password, setPassword] = useState("");
  console.log(MemoryId)
  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  // Memory 삭제 진행
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/memories/${MemoryId}`;
    console.log(password);
    axios
      .delete(url, {
        data: {
          'password' : password,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("삭제에 성공했습니다!");
          onClose();
          navigate(-1);
        }
      })
      .catch((error) => {
        if (error.status === 403) {
          alert("잘못된 비밀번호 입니다.");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div className="DeletePopupOverlay">
      <div className="DeletePopup">
        <button className="Cancel-button" onClick={onClose}>
          X
        </button>
        <div>
          <h2 className="DeletePopup-title">추억 삭제</h2>
          <div className="DeletePopup-inner">
            <p>삭제 권한 인증</p>
            <input
              className='MPinput'
              style={{margin : '0'}}
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력해 주세요."
              required
            />
          </div>
          <button className="Delete-button" onClick={handleSubmit}>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteMemoryPopup;
