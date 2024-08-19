// 더보기 버튼
import React from "react";
import "./Loadmore_button.css";

function LoadMoreButton({ onLoadMore, hasMoreItems }) {
  return (
    <div className="loadMoreButtonContainer">
      {hasMoreItems ? (
        <button onClick={onLoadMore} className="loadMoreButton">
          더 보기
        </button>
      ) : (
        <div> </div>
      )}
    </div>
  );
}

export default LoadMoreButton;
