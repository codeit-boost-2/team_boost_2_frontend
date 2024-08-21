import React from "react";
import "./Popup.css";

function Popup({ isSuccess, onClose }) {
  return (
    <div className="popupOverlay">
      <div className="popupContent">
        {isSuccess ? (
          <>
            <h2>그룹 만들기 성공</h2>
            <p>그룹이 성공적으로 등록되었습니다.</p>
          </>
        ) : (
          <>
            <h2>그룹 만들기 실패</h2>
            <p>그룹 등록에 실패했습니다.</p>
          </>
        )}
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
}

export default Popup;
