import sampleImg from "../assets/img1.png";
import "./CardMemory.css";
import { Link } from "react-router-dom";

// card/memory 컴포넌트
function Card(Memory) {
  return (
    <Link
      to={`/GroupPage/${Memory.Id}`} //MemoryId는 추억상세페이지 주소
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="card">
        <div className="cardImg">
          <img src={sampleImg} alt="대표이미지"></img>
        </div>
        <div className="cardStatus">
          <div className="writer">달봉이아들</div>
          <div className="line"></div>
          <div className="status">공개</div>
        </div>
        <div className="cardTitle">에델바이스</div>
        <div className="cardBody">
          서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.
        </div>
        <div className="cardFooter">
          <div>장소, 날짜</div>
          <div>공감 수, 댓글 수</div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
