import React from "react";
import "./Reply.css";
// import { Link } from "react-router-dom";
import /* getMemories 함수 만들기 */ "../api/api.js";

// 날짜 계산 함수
function formatDate(createdAt) {
  const date = new Date(createdAt);
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

// 추억 상세 페이지 댓글
function Reply({ comment: { nickname, content, createdAt } }) {
  const publishedOn = formatDate(createdAt);

  return (
    <div className="Reply">
      <div className="ReplyInfo">
        <div className="ReplyHeader">
          <span className="ReplyName">{nickname}</span>
          <span className="ReplyDate">{publishedOn}</span>
        </div>
      </div>
      <div className="ReplyContent">{content}</div>
    </div>
  );
}
export default Reply;
