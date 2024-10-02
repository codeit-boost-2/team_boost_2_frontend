//import LoadMoreButton from "../components/Loadmore_button.js";
import { useEffect, useState, useMemo, useCallback } from "react";
import "./Grouplist_page.css";
import axios from "axios";
import Dropdown from "../components/Dropdown_menu.js";
import CardGroup from "../components/Card_group.js";
import SearchBar from "../components/Search_bar.js";
import MakeGroupButton from "../components/Makegroup_button.js";
import NoGroup from "../components/No_group.js";
import"../components/Tab.css";

const LIMIT = 10;

async function getGroupsAxios(currentPage, itemsPerPage, isPublic) {
  const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups/${currentPage}/${itemsPerPage}?isPublic=${isPublic}`;
  const res = await axios.get(url);
  const data = res.data;
  return data.groups || [];
}

const getSortedItems = (items, order) => {
  return [...(items || [])].sort((a, b) => {
    if (order === "createdAt") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (order === "postCount") {
      return b.postCount - a.postCount;
    } else if (order === "likeCount") {
      return b.likeCount - a.likeCount;
    }
  });
};

const normalizeText = (text) => {
  return text.replace(/\s+/g, "").toLowerCase();
};

const filterItemsBySearch = (items, searchTerm) => {
  if (!Array.isArray(items)) return [];
  const normalizedSearchTerm = normalizeText(searchTerm);
  return items.filter((item) =>
    normalizeText(item.name).includes(normalizedSearchTerm)
  );
};

function GroupListPage() {
  const [order, setOrder] = useState("createdAt");
  const [filteredItems, setFilteredItems] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleItems, setVisibleItems] = useState(LIMIT);
  const [isPublic, setIsPublic] = useState(true);
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    setVisibleItems(LIMIT);
  };

  const sortedItems = useMemo(() => {
    const itemsAfterSearch = filterItemsBySearch(filteredItems, searchTerm);
    return getSortedItems(itemsAfterSearch, order);
  }, [filteredItems, order, searchTerm]);

  const handleSelect = (option) => {
    if (option === "최신순") setOrder("createdAt");
    else if (option === "게시글 많은순") setOrder("postCount");
    else if (option === "공감순") setOrder("likeCount");
  };
  const handleTabTrue = () =>{
    setIsPublic(true);
  }

  const handleTabFalse = () =>{
    setIsPublic(false);
  }

  const currentPage = 1
  const itemsPerPage = 10
  const url=`http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups/${currentPage}/${itemsPerPage}?isPublic=${isPublic}`;

  useEffect(()=>{
    const handleLoad = async () =>{
      axios.get(url)
      .then((res)=>{
        setFilteredItems(res.data.data)
      })
      .catch(error => {console.log(error)})
    }
    handleLoad();
  },[url, isPublic])

  return (
    <div style={{ fontFamily: "Spoqa Han Sans Neo, Sans-Serif" }}>
      <div className="cardGroupPage">
        <MakeGroupButton />
        <div className="header">
          <div className="publicOptionTab">
            <button
              onClick={handleTabTrue}
              className={isPublic === true ? "active" : ""}
            >
              공개
            </button>
            <button
              onClick={handleTabFalse}
              className={isPublic === false ? "active" : ""}
            >
              비공개
            </button>
          </div>
            <SearchBar onSearch={handleSearch} />
            <Dropdown
              options={["최신순", "게시글 많은순", "공감순"]}
              onSelect={handleSelect}
            />
        </div>
        <div className="cardGroupList">
          {sortedItems.length === 0 ? (
            <NoGroup />
          ) : (
            <CardGroup items={sortedItems.slice(0, visibleItems)} />
          )}
        </div>
      </div>
      {/*hasNext && <LoadMoreButton onClick={handleLoadMore} />*/}
    </div>
  );
}

export default GroupListPage;
