import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
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

function MemoryDetailPage() {
  const { MemoryId } = useParams(); // url에서 MemoryId 가져오기
  const [memory, setMemory] = useState("");
  const [comments, setComments] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isReplyPopupOpen, setIsReplyPopupOpen] = useState(false);
  const [isEditReplyPopupOpen, setIsEditReplyPopupOpen] = useState(false);
  const [isDeleteReplyPopupOpen, setIsDeleteReplyPopupOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  //Memory받아오기
  const handleLoad = async () => {
    const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/memories/${MemoryId}/comments`;
    console.log("memory: ", memory);
    axios
      .get(url)
      .then((res) => {
        if (!res.data || !res.data.memory) {
          throw new Error("Memory not found");
        }

        setMemory(res.data.memory);
        setComments(res.data.comments.data);
        setLikeCount(res.data.memory.likeCount);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        Navigate("*");
      });
  };

  useEffect(() => {
    handleLoad();
  }, []);
  
  if (error) {
    return <Navigate to="/Error" />;
  }

  /////////* 공감 보내기 버튼 클릭 핸들*//////////
  const handleLikeClick = async () => {
    const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/memories/${MemoryId}/like`;

    try {
      const response = await axios.post(url);
      if (response.status === 200) {
        setLikeCount((prevLikeCount) => prevLikeCount + 1);
        console.log("좋아요 업데이트 성공");
        alert("공감 완료!");
        navigate(0);
      }
    } catch (error) {
      console.log("Error:", error);
      alert("좋아요 업데이트 실패");
      Navigate(0);
    }
  };

  //////////*팝업 오픈 핸들*/////////
  // 추억 수정 팝업 오픈
  const openEditPopup = (id) => {
    setSelectedItemId(id);
    setIsEditPopupOpen(true);
  };

  // 추억 삭제 권한 인증 팝업 오픈
  const openDeletePopup = (id) => {
    setSelectedItemId(id);
    setIsDeletePopupOpen(true);
  };

  // 댓글 등록 팝업 오픈
  const openReplyPopup = () => {
    setIsReplyPopupOpen(true);
  };



  return (
    <div style={{ fontFamily: "Spoqa Han Sans Neo, Sans-Serif" }}>
      <div style={{ marginBottom: "100px" }}></div>
      <div className="MemoryHeader">
        <CardMemoryInfo item={memory} comment={comments} />
        <div className="MemoryButtons">
          <div className="MemoryEdit">
            <button
              className="MemoryUpdate"
              onClick={() => openEditPopup(MemoryId)}
            >
              추억 수정하기
            </button>
            <button
              className="MemoryDelete"
              onClick={() => openDeletePopup(MemoryId)}
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
          {comments.map((reply, index) => (
            <React.Fragment key={reply.id}>
              <div className="ReplyContents">
                <Reply comment={reply} />
                
              </div>
              <hr style={hrStyle} />
            </React.Fragment>
          ))}
        </div>
      )}

      {isEditPopupOpen && (
        <EditMemoryPopup
          items={memory}
          onClose={() => setIsEditPopupOpen(false)}
        />
      )}

      {isDeletePopupOpen && (
        <DeleteMemoryPopup onClose={() => setIsDeletePopupOpen(false)} />
      )}

      {isReplyPopupOpen && (
        <ReplyMemoryPopup onClose={() => setIsReplyPopupOpen(false)} />
      )}

      {isEditReplyPopupOpen && (
        <EditReplyPopup
          comments={comments}
          index={selectedCommentId}
          onClose={() => setIsEditReplyPopupOpen(false)}
        />
      )}

      {isDeleteReplyPopupOpen && (
        <DeleteReplyPopup
          index={selectedCommentId}
          onClose={() => setIsDeleteReplyPopupOpen(false)}
        />
      )}
    </div>
  );
}
export default MemoryDetailPage;
