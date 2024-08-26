// 공개 그룹 목록 페이지 - card/group 컴포넌트
import React from "react";
import "./Card_group.css";
import { Link } from 'react-router-dom';

// 시간계산 함수
function calculateDaysDifference(createdAt) {
  const now = new Date();
  const createdDate = new Date(createdAt);

  const difference = now - createdDate;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return "D+0";
  } else {
    return `D+${days}`;
  }
}

//카드 그룹에 보여지는 요소
function CardGroupItem({ item }) {
  const { img, createdAt, option, title, content, badges, memories, like } =
    item;
  const daysDifference = calculateDaysDifference(createdAt);

  //스타일
  const categoryNameStyle = { color: "#B8B8B8" };
  const titleStyle = { fontWeight: "bold" };
  const optionStyle = { color: "#B8B8B8" };

  const isPublicPath = (option === "공개") ? "/GroupPage" : "/AutPage";

  return (
    <Link to={isPublicPath} state= {{item : item }} style={{ textDecoration: "none", color: 'inherit' }} >
    <div className="cardGroupItem">
      {option === "공개" && img && (
        <img src={img} alt={title} className="cardGroupItem-img" />
      )}
      <div className="cardGroupItem-status">
        <div>{daysDifference}</div>
        <div style={optionStyle}>|</div>
        <div style={optionStyle}>{option}</div>
      </div>
      
      <div style={titleStyle}>{title}</div>
      
      <div>{content}</div>
      <div className="cardGroupItem-info">
        <div>
          <div style={categoryNameStyle}>획득배지</div>
          <div>{badges}</div>
        </div>
        {option === "공개" && memories && (
          <div>
            <div style={categoryNameStyle}>추억</div>
            <div>{memories}</div>
          </div>
        )}
        <div>
          <div style={categoryNameStyle}>그룹 공감</div>
          <div>
            <img alt='공감아이콘' src="./imgs/logo_16x16.svg" />
            {like}
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
