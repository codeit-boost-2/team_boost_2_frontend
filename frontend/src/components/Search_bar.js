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
      <input className="searchBar"
        type="text"
        value={searchBarTerm}
        onChange={handleChange}
        placeholder="그룹명을 검색해주세요"
      />
  );
}

export default SearchBar;
