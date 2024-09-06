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
    place,
    isPublic,
    likeCount,
    createdAt,
  } = item;
  console.log(item);
  const uploadDate = formatDate(createdAt);
  const isPublicPath = isPublic === true ? "/GroupPage" : "/AutPage";
  const imageUrl = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/images/${image}`;
  return(
    <>
    <Link
      to={`/MemoryPage/${item.id}`} //MemoryId는 추억상세페이지 주소
      state={{ item : item }}
      style={{ textDecoration: "none", color: "inherit" }}
    >
    <div className="card">
        <div className="cardImg">
        {isPublic === true && image && <img src={imageUrl} alt="대표이미지"></img> }
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
          <div>{place} | {uploadDate}</div>
          <div>
          <img alt="공감아이콘" src="../imgs/logo_16x16.svg" />
            {likeCount} | 댓글 수</div>
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
