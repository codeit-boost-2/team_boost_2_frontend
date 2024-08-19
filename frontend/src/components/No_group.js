// 검색 결과 0건
import React from "react";
import "./No_group.css";
import MakeGroupButton from "./Makegroup_button.js";

function NoGroup() {
  return (
    <div className="noGroup">
      <img src="./imgs/no_group_icon.svg" />
      <h2>등록된 공개 그룹이 없습니다.</h2>
      <p>가장 먼저 그룹을 만들어 보세요!</p>
      <MakeGroupButton />
    </div>
  );
}

export default NoGroup;
