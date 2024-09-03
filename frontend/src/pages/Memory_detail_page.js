import React, { useState } from "react";
import "./Memory_detail_page.css";
import { getMemories, editMemory, deleteMemory } from "../api/api.js";
//import axios from "axios";
import sampleImg from "../assets/img4.png";
import CardMemoryInfo from "../components/Card_memory_info";
import Reply from "../components/Reply";
import DeleteMemoryPopup from "../components/Delete_memory_popup.js";
import EditMemoryPopup from "../components/Edit_memory_popup.js";
import ReplyMemoryPopup from "../components/Reply_popup.js";

// 임의의 item 데이터 (추후 삭제)
const mockItem = {
  Id: 1,
  name: "작성자 이름",
  isPublic: true,
  title: "추억 제목",
  tags: ["태그1", "태그2"],
  place: "장소",
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
  password: "userPassword", // 원글 작성 시 입력한 비밀번호
  replies: [
    {
      id: 1,
      name: "eg1",
      createdAt: "1605938479029",
      content: "첫 번째 댓글",
    },
    {
      id: 2,
      name: "eg2",
      createdAt: "1605958479029",
      content: "두 번째 댓글",
    },
  ],
};

const hrStyle = {
  border: "1px solid #dddddd",
  margin: "20px 200px 20px 200px",
};

const hrReply = {
  border: "1px solid #282828",
  margin: "20px 200px 20px 200px",
};

function MemoryDetailPage() {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isReplyPopupOpen, setIsReplyPopupOpen] = useState(false);

  // 추억 수정 팝업 오픈
  const openEditPopup = (id) => {
    setSelectedItemId(id);
    setIsEditPopupOpen(true);
  };

  // 삭제 권한 인증 팝업 오픈
  const openDeletePopup = (id) => {
    setSelectedItemId(id);
    setIsDeletePopupOpen(true);
  };

  //댓글 등록 팝업 오픈
  const openReplyPopup = () => {
    setIsReplyPopupOpen(true);
  };

  // 비밀번호 일치시 수정 진행
  const handleEdit = async (updatedItem, password) => {
    if (password === mockItem.password) {
      const result = await editMemory(updatedItem);
      if (result) {
        setItems((prevItems) => {
          const splitIdx = prevItems.findIndex(
            (item) => item.Id === updatedItem.Id
          );
          return [
            ...prevItems.slice(0, splitIdx),
            updatedItem,
            ...prevItems.slice(splitIdx + 1),
          ];
        });
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  // 비밀번호 일치시 삭제 진행
  const handleDelete = async (password) => {
    if (password === mockItem.password) {
      const result = await deleteMemory(mockItem.Id, password);
      if (result) {
        setItems((prevItems) =>
          prevItems.filter((item) => item.Id !== mockItem.Id)
        );
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  // handleEdit 호출
  const handleEditConfirmation = (password) => {
    handleEdit(selectedItemId, password);
  };

  // handleDelete 호출
  const handleDeleteConfirmation = (password) => {
    handleDelete(selectedItemId, password);
  };

  return (
    <>
      <div className="MemoryHeader">
        <CardMemoryInfo item={mockItem} />
        <div className="MemoryButtons">
          <div className="MemoryEdit">
            <button
              className="MemoryUpdate"
              onClick={() => openEditPopup(mockItem.Id)}
            >
              추억 수정하기
            </button>
            <button
              className="MemoryDelete"
              onClick={() => openDeletePopup(mockItem.Id)}
            >
              추억 삭제하기
            </button>
          </div>
          <button className="likeButton">
            <img alt="공감보내기" src="../imgs/like_button.svg" />
          </button>
        </div>
      </div>
      <hr style={hrStyle} />
      <div className="MainContents">
        <img src={mockItem.img} />
        <p className="ContentMemory">{mockItem.content}</p>
      </div>
      <div>
        <button className="ReplyButton" onClick={openReplyPopup}>
          <img src="../imgs/reply_button.svg" />
        </button>
      </div>
      <div className="Replies">
        <p className="ReplyCount">댓글 {mockItem.replies.length}</p>
        <hr style={hrReply} />
        {mockItem.replies.map((reply) => (
          <Reply
            key={reply.id}
            name={reply.name}
            createdAt={reply.createdAt}
            content={reply.content}
          />
        ))}
      </div>

      {isEditPopupOpen && (
        <EditMemoryPopup
          onClose={() => setIsEditPopupOpen(false)}
          onConfirm={handleEditConfirmation}
        />
      )}

      {isDeletePopupOpen && (
        <DeleteMemoryPopup
          onClose={() => setIsDeletePopupOpen(false)}
          onConfirm={handleDeleteConfirmation}
        />
      )}

      {isReplyPopupOpen && (
        <ReplyMemoryPopup
          onClose={() => setIsReplyPopupOpen(false)}
          onChange={() => {}}
        />
      )}
    </>
  );
}

export default MemoryDetailPage;
