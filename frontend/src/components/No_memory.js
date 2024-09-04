import React from "react";
import Button from "./Button.js";
import noMemory from "../assets/noMemory.png";
const NoMemoryStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:"center"
}

function NoGroup() {
  return (
    <div style={NoMemoryStyle}>
      <img style={{marginBottom : "50px"}} src={noMemory} alt="등록된 공개 그룹이 없습니다" />
      <Button />
    </div>
  );
}

export default NoGroup;
