// 검색 바
import React, { useState } from "react";
import "./Search_bar.css";

function SearchBar({ onSearch, placeholderprop ="그룹 명을 입력해주세요." }) {
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
        placeholder={placeholderprop}
      />
  );
}

export default SearchBar;
