import React from "react";
// import "./Reply.css";
// import { Link } from "react-router-dom";
import /* getMemories 함수 만들기 */ "../api/api.js";

// 날짜 계산 함수
function formatDate(createdAt) {
  const date = new Date(parseInt(createdAt, 10));

  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return (
    <div>
      {year}.{month}.{day} {hours}:{minutes}
    </div>
  );
}

function Reply({ name, createdAt, content }) {
  const publishedOn = formatDate(createdAt);

  return (
    <div className="Reply">
      <div className="ReplyHeader">
        <span className="ReplyName">{name}</span>
        <formatDate className="ReplyDate">{publishedOn}</formatDate>
      </div>
      <div className="ReplyContent">{content}</div>
      <div>
        <img alt="댓글 수정하기" src="../imgs/edit_button.svg" />
        <img alt="댓글 삭제하기" src="../imgs/delete_button.svg" />
      </div>
    </div>
  );
}

export default Reply;
