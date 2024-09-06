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

function CardMemoryInfo({ item , replylength }) {
  const { nickname, isPublic, title, tag, place, createdAt, likeCount } =
    item;//Link로 아이템 받아오도록 적용함

    // 추억 작성 날짜
  const PublishedOn = formatDate(createdAt);

  return (
    <div className="CardMemoryInfo">
      <div className="MemoryInfoHeader">
        <div className="GroupInfo">
          <div>{nickname}</div>
          <div style={{ color: "#8D8D8D" }}>|</div>
          <div style={{ color: "#8D8D8D" }}>
            {isPublic === true ? "공개" : "비공개"}
          </div>
        </div>
      </div>
      <h1 className="MemoryTitle">{title}</h1>
      <div className="MemoryTags">
        {/*태그 하나만 받도록 일단 수정*/}
        #{tag}
      </div>
      <div className="MemoryInfoFooter">
        <div className="MemoryStatus">
          <div className="Bio" style={{ fontWeight: "bold" }}>
            <div>{place}</div>
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
              {/* replylength -> mock 데이터에 댓글 관련된 정보가 없어서 임의로 MemorydetailPage의 데이터로 가져옴 */}
              <div>{replylength}</div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardMemoryInfo;
