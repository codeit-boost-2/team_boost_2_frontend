import sampleImg from "../assets/img1.png";
import "./Card_memory.css";
import { Link } from "react-router-dom";

const feedstyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows:"auto auto auto",
  gridAutoRows: "561px",
  gap: "50px",
  margin: "auto",
};

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function CardMemoryItems( { item }){
  const {
    nickname,
    title,
    image,
    content,
    location,
    isPublic,
    likeCount,
    createdAt,
  } = item;
  const uploadDate = formatDate(createdAt);
  return(
    <>
    <Link
      to={`/GroupPage/${item.id}`} //MemoryId는 추억상세페이지 주소
      style={{ textDecoration: "none", color: "inherit" }}
    >
    <div className="card">
        <div className="cardImg">
          {image && <img src={image} alt="대표이미지"></img> }
        </div>
        <div className="cardStatus">
          <div className="writer">{nickname}</div>
          <div className="line"></div>
          <div className="status">{(isPublic === true) ? "공개" : "비공개" }</div>
        </div>
        <div className="cardTitle">{title}</div>
        <div className="cardBody">
          {content}
        </div>
        <div className="cardFooter">
          <div>{location} | {uploadDate}</div>
          <div>{likeCount} | 댓글 수</div>
        </div>
      </div>
      </Link>
    </>
  )
}


// 정렬 함수 작성
// card/memory 컴포넌트
function CardMemory( { items } ) {
  return (
      <ul className="cardGroup">
      {items.map((item) => (
        <li key={item.id}>
          <CardMemoryItems item={item} />
        </li>
      ))}
    </ul>
      );
}

export default CardMemory;
