import React, { useState } from "react";
import "./Memory_detail_page.css";
// import {getMemories} from "../api/api.js";
//import axios from "axios";
import sampleImg from "../assets/img4.png";
import CardMemoryInfo from "../components/Card_memory_info";
import Reply from "../components/Reply";

// 임의의 item 데이터 (추후 삭제)
const mockItem = {
  Id: 1,
  groupName: "예시 그룹",
  isPublic: true,
  title: "추억 제목",
  tags: ["태그1", "태그2"],
  name: "작성자 이름",
  createdAt: 1605938471029,
  img: sampleImg,
  content: `인천 앞바다에서 월척을 낚았습니다!
  가족들과 기억에 오래도록 남을 멋진 하루였어요 
  가족들과 기억에 오래도록 남을 멋진 하루였어요 
  가족들과 기억에 오래도록 남을 멋진 하루였어요 
  인천 앞바다에서 월척을 낚았습니다! 
  가족들과 기억에 오래도록 남을 멋진 하루였어요  
  인천 앞바다에서 월척을 낚았습니다!`,
  likeCount: 123,
  replies: [
    { id: 1, name: "eg1", createdAt: "1605938479029", content: "첫 번째 댓글" },
    { id: 2, name: "eg2", createdAt: "1605958479029", content: "두 번째 댓글" },
  ],
};

const hrStyle = {
  border: "1px solid #DDDDDD",
  marginLeft: "200px",
  marginRight: "200px",
  marginTop: "50px",
};

function MemoryDetailPage() {
  return (
    <>
      <CardMemoryInfo item={mockItem} />
      <hr style={hrStyle} />
      <div className="MainContents">
        <img src={mockItem.img} />
        <p className="ContentMemory">{mockItem.content}</p>
      </div>
      <button className="ReplyButton">
        <img src="../imgs/reply_button.svg" />
      </button>
      <div className="Replies">
        <p className="ReplyCount">댓글 {mockItem.replies.length}</p>
        <hr style={hrStyle} />
        {mockItem.replies.map((reply) => (
          <Reply
            key={reply.id}
            name={reply.name}
            createdAt={reply.createdAt}
            content={reply.content}
          />
        ))}
      </div>
    </>
  );
}

export default MemoryDetailPage;
