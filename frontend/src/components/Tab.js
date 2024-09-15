//공개, 비공개 탭 기능
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tab.css";

async function getGroupsAxios(currentPage, itemsPerPage, isPublic) {
  const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups//${currentPage}/${itemsPerPage}?isPublic=${isPublic}`;
  const res = await axios.get(url);
  const data = res.data;
  return data;
}

function Tab({ onFilter }) {
  const [filterOption, setFilterOption] = useState(true);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      try {
        const result = await getGroupsAxios(1, 10, filterOption);
        setGroups(result.data);
        onFilter(result.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [filterOption, onFilter]);

  const handleFilterClick = (isPublic) => {
    setFilterOption(isPublic);
  };

  // 에러났을 때
  if (error) return <div>Error: {error.message}</div>;

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
