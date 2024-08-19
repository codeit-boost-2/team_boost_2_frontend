//그룹 만들기 버튼 (이후 그룹 만들기 페이지로 이동 링크 추가)
import React from "react";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import "./Makegroup_button.css";

function MakeGroupButton() {
  //const history = useHistory();

  const handleClick = () => {
    // history.push("/make_group_page");
  };

  return (
    //버튼 태그 link 로 감싸기
    //<Link to="/makegroup"></Link>
    <button onClick={handleClick} className="makeGroupButton">
      그룹 만들기
    </button>
  );
}

export default MakeGroupButton;
