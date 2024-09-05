import CardMemory from "../components/Card_memory.js";
import Info from "../components/Info.js";
import Button from "../components/Button.js";
import Tab from "../components/Tab_memory.js";
import Search from "../components/Search.js";
import { useState, useCallback, useMemo } from "react";
import { useLocation, Link } from 'react-router-dom';
import axios from "axios";
import NoMemory from "../components/No_memory.js";
import memories from "../api/memorymock.json";
import SearchBar from "../components/Search_bar.js";
import Dropdown from "../components/Dropdown_menu.js";



const style = {
  margin: "20px",
  display: "flex",
  fontFamily: "Spoqa Han Sans Neo, Sans-Serif",
  fontWeight: "600",
  justifyContent: "center",
  alignItems: "center",
};

const feedstyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridAutoRows: "561px",
  margin: "12px",
  gap: "10px",
};

const pageStyle = {
  marginTop: "150px",
  marginLeft: "20px",
  marginRight: "20px"
};

const getSortedItems = (items, order) => {
  return [...items].sort((a, b) => {
    if (order === "createdAt") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (order === "memories") {
      return b.memories - a.memories;
    } else if (order === "likeCount") {
      return b.likeCount - a.likeCount;
    } else {
      return b.badges - a.badges;
    }
  });
};

const normalizeText = (text) => {
  return text.replace(/\s+/g, "").toLowerCase();
};

const filterItemsBySearch = (items, searchTerm) => {
  const normalizedSearchTerm = normalizeText(searchTerm);
  return items.filter((item) =>
    normalizeText(item.title).includes(normalizedSearchTerm)
  ) 
};

function GroupPage() {
  
  //Link 태그로 받은 mock items
  const location = useLocation();
  const mock = location.state;

  const [order, setOrder] = useState ("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);


  const groupMemories = filteredItems.filter(
    (item) => item.groupid === mock.item.id
  );

  const handleFilter = useCallback((filteredItems) => {
    setFilteredItems(filteredItems);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const sortedItems = useMemo(() => {
    const itemsAfterFilter = filterItemsBySearch(groupMemories, searchTerm);
    return getSortedItems(itemsAfterFilter, order);
  }, [groupMemories, order, searchTerm]);

  const handleSelect = (option) => {
    if (option === "최신순") setOrder("createdAt");
    else if (option === "공감순") setOrder("likeCount");
  };
  

  //api 연동.. 해보기
  //const res = await axios.get("memory_api");
  return (
    <div style={pageStyle}>
      <Info items={mock}/>
      <hr />
      <div style={style}>
        <div
          style={{
            flexGrow: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          추억목록
        </div>
        <Button />
      </div>
      <div style={{display: 'grid', width:'85%', gridTemplateColumns: '1fr 8fr 1fr', margin: '0 auto', gap:"50px", justifyContent:"center"}}>
        <Tab items={filteredItems} onFilter={handleFilter} />
        <SearchBar onSearch={handleSearch}
        placeholderprop="제목을 입력해 주세요" />
          <Dropdown
            options={["최신순", "공감순"]}
            onSelect={handleSelect}
          />
      </div>
      <div className="cardGroupList">
      {groupMemories.length === 0 ? (
            <NoMemory />
          ) : (
            <CardMemory items={sortedItems} />
          )}
          </div>
    </div>
  );
}

export default GroupPage;
