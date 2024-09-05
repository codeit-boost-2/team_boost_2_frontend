//공개, 비공개 탭 기능
import React, { useState, useEffect } from "react";
//import { getGroups } from "../api/api.js";
//import useAsync from "../hooks/useAsync.js";
// mock 데이터 추후 제거
import items from "../api/memorymock.json";
import "./Tab.css";

// api 연결하면 아래의 function으로 대체
/*
function Tab({ onFilter }) {
  const [filterOption, setFilterOption] = useState(true);
  const { data: groups, loading, error } = useAsync(getGroups);

  useEffect(() => {
    if (groups) {
      const filteredItems = groups.filter(
        (item) => item.isPublic === filterOption
      );
      onFilter(filteredItems);
    }
  }, [groups, filterOption, onFilter]);

  const handleFilterClick = (isPublic) => {
    setFilterOption(isPublic);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
*/

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
