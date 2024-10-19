import React from "react";
import "./Reply.css";
import { useState } from "react";
import EditReplyPopup from "./Edit_reply_popup";
import DeleteReplyPopup from "./Delete_reply_popup";

// 날짜 계산 함수
function formatDate(createdAt) {
  const date = new Date(createdAt);
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return (
    <div>
      {year}.{month}.{day} {hours}:{minutes}
    </div>
  );
}


// 추억 상세 페이지 댓글
function Reply({ comment }) {
  const [changeModal, setChangeModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const{ id, nickname, content, createdAt } = comment
  const publishedOn = formatDate(createdAt);

    // // 댓글 수정 팝업 오픈
    // const openEditReplyPopup = () => {
    //   setChangeModal(true)
    // };
  
    // // 댓글 삭제 팝업 오픈
    // const openDeleteReplyPopup = (index) => {
    //   setDeleteModal(true)
    // };

  return (
    <>
    <div className="Reply">
      <div className="ReplyInfo">
        <div className="ReplyHeader">
          <span className="ReplyName">{nickname}</span>
          <span className="ReplyDate">{publishedOn}</span>
        </div>
      </div>
      <div className="ReplyContent">
        <div>
        {content}
        </div>
        <div>
        <button
        style={{right: '10px'}}
          className="ReplyEdit"
          onClick={() => setChangeModal(!changeModal)}>
          <img alt="댓글 수정하기" src="../imgs/edit_button.svg" />
        </button>
          {
            changeModal === true ? <EditReplyPopup comments={comment} setModal={setChangeModal}/> : null
          }
        <button
          className="ReplyDelete"
          onClick={() => setDeleteModal(!deleteModal)}>
          <img alt="댓글 삭제하기" src="../imgs/delete_button.svg" />
        </button>
          {
            deleteModal === true ? <DeleteReplyPopup id={id} setModal={setDeleteModal}/> : null
          }
          </div>
        </div>
      </div>

      
        
    
    </>
  );
}
export default Reply;
