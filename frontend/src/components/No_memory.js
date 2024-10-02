import React from "react";
import Button from "./Button.js";
import { Link } from "react-router-dom";
const NoMemoryStyle = {
    margin: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent:"center"
}

function NoGroup(GroupId) {
  return (
    <Link to="/MemoryPost" state={GroupId}>
    <div style={NoMemoryStyle}>
      <img style={{marginBottom : "50px"}} src='../imgs/no_memory.svg' alt="등록된 공개 그룹이 없습니다" />
      <Button />
    </div>
    </Link>
  );
}

export default NoGroup;
