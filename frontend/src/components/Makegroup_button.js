//그룹 만들기 버튼
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
    <Link to="/makegroup">
      <button onClick={handleClick} className="makeGroupButton">
        그룹 만들기
      </button>
    </Link>
  );
}

export default MakeGroupButton;
