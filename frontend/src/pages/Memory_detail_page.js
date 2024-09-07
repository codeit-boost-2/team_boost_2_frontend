import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./Memory_detail_page.css";
// import { editMemory, deleteMemory, editReply, deleteReply, updateLikeCount } from "../api/api.js";
import axios from "axios";
import CardMemoryInfo from "../components/Card_memory_info";
import Reply from "../components/Reply";
import DeleteMemoryPopup from "../components/Delete_memory_popup.js";
import EditMemoryPopup from "../components/Edit_memory_popup.js";
import ReplyMemoryPopup from "../components/Reply_popup.js";
import DeleteReplyPopup from "../components/Delete_reply_popup.js";
import EditReplyPopup from "../components/Edit_reply_popup.js";
import Like from "../components/Like.js";

async function getPostAxios(MemoryId) {
  const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/memories/${MemoryId}/comments`;
  const res = await axios.get(url);
  const data = res.data;
  return data;
}

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

  const imageUrl = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/images/${image}`;

  return (
    <div className="MainContents">
      <img src={imageUrl} alt="Memory" />
      <p className="ContentMemory">{content}</p>
    </div>
  );
}

// 추억 상세 페이지 댓글
/*
function Reply(comment) {
  const { nickname, content, createdAt } = comment;

  return (
    <div className="Reply">
      <div className="ReplyInfo">
        <div className="ReplyHeader">
          <span className="ReplyName">{nickname}</span>
          <span className="ReplyDate">{createdAt}</span>
        </div>
      </div>
      <div className="ReplyContent">{content}</div>
    </div>
  );
}
*/

function MemoryDetailPage() {
  const { MemoryId } = useParams(); // url에서 MemoryId 가져오기
  const [memory, setMemory] = useState(null);
  const [comments, setComments] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isReplyPopupOpen, setIsReplyPopupOpen] = useState(false);
  const [isEditReplyPopupOpen, setIsEditReplyPopupOpen] = useState(false);
  const [isDeleteReplyPopupOpen, setIsDeleteReplyPopupOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  ///////////////////////////////////////
  //Memory받아오기
  const handleLoad = async (memoryId) => {
    try {
      const data = await getPostAxios(memoryId); // 서버에서 데이터 가져오기
      if (data) {
        setMemory(data.memory);
        setComments(data.comments.data);
        setLikeCount(data.memory.likeCount); // 좋아요 개수 설정
      } else {
        console.error("메모리 데이터를 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (MemoryId) {
      handleLoad(MemoryId);
    }
  }, [MemoryId]);

  /////////* 공감 보내기 버튼 클릭 핸들*//////////
  const handleLikeClick = async () => {
    const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/memories/${MemoryId}/like`;

    try {
      const response = await axios.post(url);
      if (response.status === 200) {
        setLikeCount((prevLikeCount) => prevLikeCount + 1);
        console.log("좋아요 상태가 서버에 성공적으로 업데이트되었습니다.");
      } else {
        console.error("좋아요 상태 업데이트 요청이 실패했습니다.");
      }
    } catch (error) {
      console.error("좋아요 상태 업데이트 중 오류 발생:", error);
    }
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

  ///////////* 댓글 등록 핸들 *///////////

  ///////////* 수정, 삭제 핸들 *//////////
  // Memory 수정 진행
  const handleEdit = async (updatedItem, password) => {
    const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/memories/${updatedItem.id}`;

    try {
      const response = await axios.put(url, {
        ...updatedItem,
        password, // password 포함
      });

      if (response.status === 200) {
        setMemory((prevMemory) => ({
          ...prevMemory,
          ...updatedItem, // 성공적으로 수정된 경우 상태 업데이트
        }));
        console.log("해당 Post가 성공적으로 수정되었습니다.");
      } else {
        console.error("해당 Post 수정 요청이 실패했습니다.");
      }
    } catch (error) {
      console.error("해당 Post를 수정하는 데 실패했습니다:", error);
    }
  };

  // Memory 삭제 진행
  const handleDelete = async (password) => {
    const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/memories/${memory.id}`;

    try {
      const response = await axios.delete(url, {
        data: { password },
      });

      if (response.status === 200) {
        setIsDeleted(true);
        console.log("Post가 성공적으로 삭제되었습니다.");
      } else {
        console.error("Post 삭제 요청이 실패했습니다.");
      }
    } catch (error) {
      console.error("Post를 삭제하는 데 실패했습니다:", error);
    }
  };

  // Reply 수정 진행
  const handleEditReply = async (updatedReply, password) => {
    const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/comments/${updatedReply.id}`;

    try {
      const response = await axios.put(url, {
        content: updatedReply.content,
        password,
      });

      if (response.status === 200) {
        setMemory((prevMemory) => ({
          ...prevMemory,
          comments: {
            ...prevMemory.comments,
            data: prevMemory.comments.data.map((reply) =>
              reply.id === updatedReply.id ? updatedReply : reply
            ),
          },
        }));
        console.log("댓글이 성공적으로 수정되었습니다.");
      } else {
        console.error("댓글 수정 요청이 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글을 수정하는 데 실패했습니다:", error);
    }
  };

  // Reply 삭제 진행
  const handleDeleteReply = async (replyId, password) => {
    const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/comments/${replyId}`;

    try {
      const response = await axios.delete(url, {
        data: { password },
      });

      if (response.status === 200) {
        setMemory((prevMemory) => ({
          ...prevMemory,
          comments: {
            ...prevMemory.comments,
            data: prevMemory.comments.data.filter(
              (reply) => reply.id !== replyId
            ),
          },
        }));
        console.log("댓글이 성공적으로 삭제되었습니다.");
      } else {
        console.error("댓글 삭제 요청이 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글을 삭제하는 데 실패했습니다:", error);
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
              <Like handleLikeClick={handleLikeClick} likeCount={likeCount} />
            </div>
          </div>

          <hr style={hrStyle} />

          <MemoryDetailMainContent memory={memory} />

          <div>
            <button className="ReplyButton" onClick={openReplyPopup}>
              <img src="../imgs/reply_button.svg" alt="댓글 달기" />
            </button>
          </div>
          {/*comment가 있는 경우만 렌더링*/}
          {comments && comments.length > 0 && (
            <div className="Replies">
              <p className="ReplyCount">댓글 {comments.length}</p>
              <hr style={hrReply} />
              {comments.map((reply) => (
                <React.Fragment key={reply.id}>
                  <div className="ReplyContents">
                    <Reply comment={reply} />
                    <div className="ReplyControl">
                      <button
                        className="ReplyEdit"
                        onClick={() => openEditReplyPopup(reply.id)}
                      >
                        <img
                          alt="댓글 수정하기"
                          src="../imgs/edit_button.svg"
                        />
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
          )}
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
          memoryId={memory.id}
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
