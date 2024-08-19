//공개, 비공개 탭 기능
import React, { useState, useEffect } from "react";
import items from "../api/mock.json";
import "./Tab.css";

function Tab({ onFilter }) {
  const [filterOption, setFilterOption] = useState("공개");

  useEffect(() => {
    const filteredItems = items.filter((item) => item.option === filterOption);
    onFilter(filteredItems);
  }, [filterOption, onFilter]);

  const handleFilterClick = (option) => {
    setFilterOption(option);
  };

  return (
    <div>
      <div className="privateOptionTab">
        <button
          onClick={() => handleFilterClick("공개")}
          className={filterOption === "공개" ? "active" : ""}
        >
          공개
        </button>
        <button
          onClick={() => handleFilterClick("비공개")}
          className={filterOption === "비공개" ? "active" : ""}
        >
          비공개
        </button>
      </div>
    </div>
  );
}

export default Tab;
