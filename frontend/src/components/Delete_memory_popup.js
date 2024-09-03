import React, { useState } from "react";
import "./Delete_memory_popup.css";

function DeleteMemoryPopup({ onClose, onConfirm }) {
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    onConfirm(password);
    onClose(); // 팝업 닫기
  };

  return (
    <div className="DeletePopupOverlay">
      <div className="DeletePopup">
        <button className="Cancel-button" onClick={onClose}>
          <img alt="취소" src="../imgs/cancel_icon.svg" />
        </button>
        <div>
          <h2 className="DeletePopup-title">추억 삭제</h2>
          <div className="DeletePopup-inner">
            <p>삭제 권한 인증</p>
            <input
              className="Password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요."
            />
          </div>
          <button className="Delete-button" onClick={handleConfirm}>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteMemoryPopup;
