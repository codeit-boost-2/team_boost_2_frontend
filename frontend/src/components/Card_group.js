// 공개 그룹 목록 페이지 - card/group 컴포넌트
import React from "react";
import "./Card_group.css";
import { Link } from "react-router-dom";

// 시간계산 함수
function calculateDaysDifference(createdAt) {
  const now = new Date();
  const createdDate = new Date(createdAt);

  const difference = now - createdDate;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (days <= 0) {
    return "D+0";
  } else {
    return `D+${days}`;
  }
}

//카드 그룹에 보여지는 요소
function CardGroupItem({ item }) {
  const {
    name,
    image,
    introduction,
    isPublic,
    likeCount,
    postCount,
    createdAt,
  } = item;
  const daysDifference = calculateDaysDifference(createdAt);
  let imageUrl = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/images/${image}`;
  if(image === null)
  {
      imageUrl = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/images/default.jpg`;
  }

  //스타일
  const categoryNameStyle = { color: "#B8B8B8" };
  const nameStyle = { fontWeight: "bold" };
  const isPublicStyle = { color: "#B8B8B8" };

  //공개 여부에 따라 경로 변경
  const isPublicPath = isPublic === true ? `/GroupPage/${item.id}` : "/AutPage";

  return (
    <Link
      to={isPublicPath}
      state={{ item: item }}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="cardGroupItem">
        {isPublic === true && (
          <img
            style={{ width: "343px", height: "343px", objectFit: "cover" }}
            src={imageUrl}
            alt={name}
            className="cardGroupItem-img"
          />
        )}
        <div className="cardGroupItem-status">
          <div>{daysDifference}</div>
          <div style={isPublicStyle}>|</div>
          <div style={isPublicStyle}>
            {isPublic === true ? "공개" : "비공개"}
          </div>
        </div>
        <div style={nameStyle}>{name}</div>
        {isPublic === true && <div>{introduction}</div>}
        <div className="cardGroupItem-info">
          <div>
            <div style={categoryNameStyle}>추억</div>
            <div>{postCount}</div>
          </div>
          <div>
            <div style={categoryNameStyle}>그룹 공감 </div>
            <div>
              <img alt="공감아이콘" src="./imgs/logo_16x16.svg" />
              {likeCount}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CardGroup({ items }) {
  return (
    <ul className="cardGroup">
      {items.map((item) => (
        <li key={item.id}>
          <CardGroupItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export default CardGroup;
