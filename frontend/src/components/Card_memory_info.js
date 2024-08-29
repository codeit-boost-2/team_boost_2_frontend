// 추억 상세 페이지 상단
import React from "react";
import "./Card_memory_info.css";
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

function CardMemoryInfo({ item }) {
  const {
    groupName,
    isPublic,
    title,
    tags,
    name, // 작성자 이름(nickName)
    createdAt,
    likeCount,
    replies,
  } = item;

  // 추억 작성 날짜
  const PublishedOn = formatDate(createdAt);

  return (
    <div className="CardMemoryInfo">
      <div className="MemoryInfoHeader">
        <div className="GroupInfo">
          <div>{groupName}</div>
          <div style={{ color: "#8D8D8D" }}>|</div>
          <div style={{ color: "#8D8D8D" }}>
            {isPublic === true ? "공개" : "비공개"}
          </div>
        </div>
        <div className="MemoryEdit">
          <p>추억 수정하기</p>
          <p>추억 삭제하기</p>
        </div>
      </div>
      <h1 className="MemoryTitle">{title}</h1>
      <div className="MemoryTags">
        {tags.map((tag, index) => (
          <React.Fragment key={index}>
            #{tag}
            {index < tags.length - 1}
          </React.Fragment>
        ))}
      </div>
      <div className="MemoryInfoFooter">
        <div className="MemoryStatus">
          <div className="Bio" style={{ fontWeight: "bold" }}>
            <div>{name}</div>
            <div>•</div>
            <div>{PublishedOn}</div>
          </div>
          <div style={{ color: "#8D8D8D", display: "flex", gap: "10px" }}>
            <div className="likeCount">
              <img alt="공감" src="../imgs/heart.svg" />
              <div>{likeCount}</div>
            </div>
            <div className="repliesCount">
              <img alt="댓글" src="../imgs/icon_bubble.svg" />
              <div>{replies.length}</div>
            </div>
          </div>
        </div>
        <button className="likeButton">
          <img alt="공감보내기" src="../imgs/like_button.svg" />
        </button>
      </div>
    </div>
  );
}

export default CardMemoryInfo;
