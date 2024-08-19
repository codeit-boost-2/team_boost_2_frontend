// 검색 바
import React, { useState } from "react";
import "./Search_bar.css";

function SearchBar({ onSearch }) {
  const [searchBarTerm, setSearchBarTerm] = useState("");

  const handleChange = (e) => {
    setSearchBarTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="searchBar">
      <img src="./imgs/icon_search.svg" alt="Search Icon" />
      <input
        type="text"
        value={searchBarTerm}
        onChange={handleChange}
        placeholder="그룹명을 검색해주세요"
      />
    </div>
  );
}

export default SearchBar;
