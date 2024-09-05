import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Memory_detail_page.css";
import {
  getMemories,
  editMemory,
  deleteMemory,
  editReply,
  deleteReply,
} from "../api/api.js";
//import axios from "axios";
import sampleImg from "../assets/img4.png";
import CardMemoryInfo from "../components/Card_memory_info";
import Reply from "../components/Reply";
import DeleteMemoryPopup from "../components/Delete_memory_popup.js";
import EditMemoryPopup from "../components/Edit_memory_popup.js";
import ReplyMemoryPopup from "../components/Reply_popup.js";
import DeleteReplyPopup from "../components/Delete_reply_popup.js";
import EditReplyPopup from "../components/Edit_reply_popup.js";

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
      password: "reply1PW",
    },
    {
      id: 2,
      name: "eg2",
      createdAt: "1605958479029",
      content: "두 번째 댓글",
      password: "reply2PW",
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

  //Link 태그로 받은 mock items
  const location = useLocation();
  const mock = location.state;
  
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isReplyPopupOpen, setIsReplyPopupOpen] = useState(false);
  const [isEditReplyPopupOpen, setIsEditReplyPopupOpen] = useState(false);
  const [isDeleteReplyPopupOpen, setIsDeleteReplyPopupOpen] = useState(false);

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

  //댓글 수정 팝업 오픈
  const openEditReplyPopup = (id) => {
    setSelectedItemId(id);
    setIsEditReplyPopupOpen(true);
  };

  //댓글 삭제 팝업 오픈
  const openDeleteReplyPopup = () => {
    setIsDeleteReplyPopupOpen(true);
  };

  // 비밀번호 일치시 Memory 수정 진행
  const handleEdit = async (updatedItem, password) => {
    if (password === mockItem.replies.password) {
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

  // 비밀번호 일치시 Memory 삭제 진행
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

  // 비밀번호 일치시 Reply 수정 진행
  const handleEditReply = async (updatedReply, password) => {
    const replyToEdit = mockItem.replies.find(
      (reply) => reply.id === updatedReply.id
    );

    if (replyToEdit && password === replyToEdit.password) {
      const result = await editReply(updatedReply);
      if (result) {
        setItems((prevItems) => {
          const updatedItems = prevItems.map((item) => {
            if (item.Id === mockItem.Id) {
              return {
                ...item,
                replies: item.replies.map((reply) =>
                  reply.id === updatedReply.id ? updatedReply : reply
                ),
              };
            }
            return item;
          });
          return updatedItems;
        });
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  // 비밀번호 일치시 Reply 삭제 진행
  const handleDeleteReply = async (replyId, password) => {
    const replyToDelete = mockItem.replies.find(
      (reply) => reply.id === replyId
    );

    if (replyToDelete && password === replyToDelete.password) {
      const result = await deleteReply(replyId, password);
      if (result) {
        setItems((prevItems) => {
          const updatedItems = prevItems.map((item) => {
            if (item.Id === mockItem.Id) {
              return {
                ...item,
                replies: item.replies.filter((reply) => reply.id !== replyId),
              };
            }
            return item;
          });
          return updatedItems;
        });
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

  // handleEditReply 호출
  const handleEditReplyConfirmation = (password) => {
    handleEditReply(selectedItemId, password);
  };

  // handleDeleteReply 호출
  const handleDeleteReplyConfirmation = (password) => {
    handleDeleteReply(selectedItemId, password);
  };

  return (
    <div style={{ fontFamily: "Spoqa Han Sans Neo, Sans-Serif" }}>
    <div style={{marginBottom:"100px"}}></div>
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
          <>
            <div className="ReplyContents">
              <Reply
                key={reply.id}
                name={reply.name}
                createdAt={reply.createdAt}
                content={reply.content}
              />
              <div className="ReplyControl">
                <button className="ReplyEdit" onClick={openEditReplyPopup}>
                  <img alt="댓글 수정하기" src="../imgs/edit_button.svg" />
                </button>
                <button className="ReplyDelete" onClick={openDeleteReplyPopup}>
                  <img alt="댓글 삭제하기" src="../imgs/delete_button.svg" />
                </button>
              </div>
            </div>
            <hr style={hrStyle} />
          </>
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

      {isEditReplyPopupOpen && (
        <EditReplyPopup
          onClose={() => setIsEditReplyPopupOpen(false)}
          onConfirm={handleEditReplyConfirmation}
        />
      )}

      {isDeleteReplyPopupOpen && (
        <DeleteReplyPopup
          onClose={() => setIsDeleteReplyPopupOpen(false)}
          onConfirm={handleDeleteReplyConfirmation}
        />
      )}
    </div>
  );
}

export default MemoryDetailPage;
