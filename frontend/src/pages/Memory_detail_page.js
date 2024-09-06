import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./Memory_detail_page.css";
import {
  getDataById,
  editMemory,
  deleteMemory,
  editReply,
  deleteReply,
  updateLikeCount,
} from "../api/api.js";
//import axios from "axios";
import CardMemoryInfo from "../components/Card_memory_info";
import Reply from "../components/Reply";
import DeleteMemoryPopup from "../components/Delete_memory_popup.js";
import EditMemoryPopup from "../components/Edit_memory_popup.js";
import ReplyMemoryPopup from "../components/Reply_popup.js";
import DeleteReplyPopup from "../components/Delete_reply_popup.js";
import EditReplyPopup from "../components/Edit_reply_popup.js";
import Like from "../components/Like.js";

/* // mock 데이터 //
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
*/

// 구분선 Style
const hrStyle = {
  border: "1px solid #dddddd",
  margin: "20px 200px 20px 200px",
};

const hrReply = {
  border: "1px solid #282828",
  margin: "20px 200px 20px 200px",
};

// 추억 상세 페이지 사진, 글
function MemoryDetailMainContent({ memory }) {
  const { image, content } = memory;
  // image url을 받아와야함
  return (
    <div className="MainContents">
      <img src={image} alt="Memory" />
      <p className="ContentMemory">{content}</p>
    </div>
  );
}

function MemoryDetailPage() {
  //Link 태그로 받은 mock items
  //const location = useLocation();
  //const mock = location.state;

  const { memoryId } = useParams(); // url에서 memoryId 가져오기
  const [memory, setMemory] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isReplyPopupOpen, setIsReplyPopupOpen] = useState(false);
  const [isEditReplyPopupOpen, setIsEditReplyPopupOpen] = useState(false);
  const [isDeleteReplyPopupOpen, setIsDeleteReplyPopupOpen] = useState(false);
  const [like, setLike] = useState(0);

  ///////////////////////////////////////
  //Memory받아오기
  const handleLoad = async (id) => {
    try {
      const memoryData = await getDataById(id); // 서버에서 데이터 가져오기
      if (memoryData) {
        setMemory(memoryData);
        setLike(memoryData.likeCount); // 좋아요 개수 설정
      } else {
        console.error("메모리 데이터를 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (memoryId) {
      handleLoad(memoryId);
    }
  }, [memoryId]);

  /////////* 공감 보내기 버튼 클릭 핸들*//////////
  const handleLikeClick = () => {
    setLike((prevLike) => prevLike + 1);

    updateLikeCount(memoryId)
      .then(() => {
        console.log("좋아요 상태가 서버에 업데이트되었습니다.");
      })
      .catch((error) => {
        console.error("좋아요 상태 업데이트 중 오류 발생:", error);
      });
  };

  //////////*팝업 오픈 핸들*/////////
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

  ///////////* 수정, 삭제 핸들*///////////
  // Memory 수정 진행
  const handleEdit = async (updatedItem, password) => {
    try {
      const result = await editMemory(updatedItem, password);

      if (result) {
        setMemory((prevMemory) => ({
          ...prevMemory,
          ...updatedItem,
        }));
      }
    } catch (error) {
      console.error("메모리를 수정하는 데 실패했습니다.", error);
    }
  };

  // Memory 삭제 진행
  const handleDelete = async (password) => {
    if (!memory || !memory.Id) return;

    const result = await deleteMemory(memory.Id, password);
    if (result) {
      setIsDeleted(true); // 삭제 성공 상태:true
    }
  };
  if (isDeleted) {
    return <Navigate to="/GroupPage" />; // 삭제 후 GroupPage로 이동
  }

  // Reply 수정 진행
  const handleEditReply = async (updatedReply, password) => {
    try {
      const result = await editReply(updatedReply, password);

      if (result) {
        setMemory((prevMemory) => {
          return {
            ...prevMemory,
            replies: prevMemory.replies.map((reply) =>
              reply.id === updatedReply.id ? updatedReply : reply
            ),
          };
        });
      }
    } catch (error) {
      console.error("댓글을 수정하는 데 실패했습니다.", error);
    }
  };

  // Reply 삭제 진행
  const handleDeleteReply = async (replyId, password) => {
    try {
      const result = await deleteReply(replyId, password);

      if (result) {
        setMemory((prevMemory) => ({
          ...prevMemory,
          replies: prevMemory.replies.filter((reply) => reply.id !== replyId),
        }));
      }
    } catch (error) {
      console.error("댓글을 삭제하는 데 실패했습니다.", error);
    }
  };

  ///////////*삭제, 수정 호출 핸들*/////////////
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

 // card/memory에서 아이템 받아와서 적용함

  return (
    <div style={{ fontFamily: "Spoqa Han Sans Neo, Sans-Serif" }}>
      <div style={{ marginBottom: "100px" }}></div>
      {memory ? ( // memory가 있을 때 렌더링
        <>
          <div className="MemoryHeader">
            <CardMemoryInfo item={memory} />
            <div className="MemoryButtons">
              <div className="MemoryEdit">
                <button
                  className="MemoryUpdate"
                  onClick={() => openEditPopup(memory.Id)}
                >
                  추억 수정하기
                </button>
                <button
                  className="MemoryDelete"
                  onClick={() => openDeletePopup(memory.Id)}
                >
                  추억 삭제하기
                </button>
              </div>
              <Like handleLikeClick={handleLikeClick} likeCount={like} />
            </div>
          </div>

          <hr style={hrStyle} />

          <MemoryDetailMainContent memory={memory} />

          <div>
            <button className="ReplyButton" onClick={openReplyPopup}>
              <img src="../imgs/reply_button.svg" alt="댓글 달기" />
            </button>
          </div>
          <div className="Replies">
            <p className="ReplyCount">댓글 {memory.replies.length}</p>
            <hr style={hrReply} />
            {memory.replies.map((reply) => (
              <React.Fragment key={reply.id}>
                <div className="ReplyContents">
                  <Reply
                    name={reply.name}
                    createdAt={reply.createdAt}
                    content={reply.content}
                  />
                  <div className="ReplyControl">
                    <button
                      className="ReplyEdit"
                      onClick={() => openEditReplyPopup(reply.id)}
                    >
                      <img alt="댓글 수정하기" src="../imgs/edit_button.svg" />
                    </button>
                    <button
                      className="ReplyDelete"
                      onClick={() => openDeleteReplyPopup(reply.id)}
                    >
                      <img
                        alt="댓글 삭제하기"
                        src="../imgs/delete_button.svg"
                      />
                    </button>
                  </div>
                </div>
                <hr style={hrStyle} />
              </React.Fragment>
            ))}
          </div>
        </>
      ) : (
        <Navigate to="/*" /> // memory가 없을 때는 404페이지로 연결
      )}

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
