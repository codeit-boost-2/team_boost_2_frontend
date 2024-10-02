import "./Card_memory.css";
import { Link } from "react-router-dom";

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
    commentCount,
  } = item;

  const uploadDate = formatDate(createdAt);
  const isPublicPath = isPublic === true ? `/MemoryPage/${item.id}` : "/AutPage";
  const imageUrl = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/images/${image}`;

  return(
    <>
    <Link
      to={isPublicPath} //MemoryId는 추억상세페이지 주소
      state={{ item : item }}
      style={{ textDecoration: "none", color: "inherit" }}
    >
    <div className="card">
        <div className="cardImg">
        {isPublic === true && image && <img className="groupIMG" src={imageUrl} alt="대표이미지"></img> }
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
          <div style={{display:"flex"}}>
            {location} 
            <div className="line" style={{marginLeft:"7px",marginRight:"7px"}}></div>
            {uploadDate}
          </div>
          <div>
            <div style={{display:"flex"}}>
              <img style={{marginRight:"4px",}} alt="공감아이콘" src="../imgs/logo_16x16.svg" />
              {likeCount}  <div stlye={{margin:"3px"}}></div>
              <img style={{margin:"0 7px"}} alt="댓글아이콘" src="../imgs/icon_bubble.svg" />
              {commentCount}
              </div>
            </div>
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
      <ul className="feed">
      {items.map((item) => (
        <li style ={{height: '500px'}}key={item.id}>
          <CardMemoryItems item={item} />
        </li>
      ))}
    </ul>
      );
}

export default CardMemory;
