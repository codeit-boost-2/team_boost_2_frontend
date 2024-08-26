//공개, 비공개 탭 기능
import React, { useState, useEffect } from "react";
// import { getGroups } from "../api/api.js";
import items from "../api/mock.json";
import "./Tab.css";

function Tab({ onFilter }) {
  const [filterOption, setFilterOption] = useState(true);

  useEffect(() => {
    const filteredItems = items.filter(
      (item) => item.isPublic === filterOption
    );
    onFilter(filteredItems);
  }, [filterOption, onFilter]);

  const handleFilterClick = (isPublic) => {
    setFilterOption(isPublic);
  };

  return (
    <div>
      <div className="publicOptionTab">
        <button
          onClick={() => handleFilterClick(true)}
          className={filterOption === true ? "active" : ""}
        >
          공개
        </button>
        <button
          onClick={() => handleFilterClick(false)}
          className={filterOption === false ? "active" : ""}
        >
          비공개
        </button>
      </div>
    </div>
  );
}

export default Tab;
