import { useEffect, useState, useMemo, useCallback } from "react";
import "./Grouplist_page.css";
import axios from "axios";
import Dropdown from "../components/Dropdown_menu.js";
import CardGroup from "../components/Card_group.js";
import Tab from "../components/Tab.js";
import SearchBar from "../components/Search_bar.js";
import MakeGroupButton from "../components/Makegroup_button.js";
import NoGroup from "../components/No_group.js";
//import LoadMoreButton from "../components/Loadmore_button.js";

const LIMIT = 10;

async function getGroupsAxios(currentPage, itemsPerPage, isPublic) {
  const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups/${currentPage}/${itemsPerPage}?isPublic=true`;
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
  const [offset, setOffset] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleItems, setVisibleItems] = useState(LIMIT);
  const [isPublic, setIsPublic] = useState(true);

  const handleFilter = useCallback((filteredItems) => {
    setFilteredItems(filteredItems || []);
    setVisibleItems(LIMIT);
  }, []);
  const handleSearch = (term) => {
    setSearchTerm(term);
    setVisibleItems(LIMIT);
  };

  const sortedItems = useMemo(() => {
    const itemsAfterFilter = filterItemsBySearch(filteredItems, searchTerm);
    return getSortedItems(itemsAfterFilter, order);
  }, [filteredItems, order, searchTerm]);
  
  const handleSelect = (option) => {
    if (option === "최신순") setOrder("createdAt");
    else if (option === "게시글 많은순") setOrder("postCount");
    else if (option === "공감순") setOrder("likeCount");
  };

  const handleLoad = useCallback(
    async (options) => {
      const result = await getGroupsAxios(
        options.offset / LIMIT + 1,
        LIMIT,
        isPublic
      );
      if (!result) return;

      const groups = result;
      if (options.offset === 0) {
        setFilteredItems(groups);
      } else {
        setFilteredItems((prevItems) => [...prevItems, ...groups]);
      }
      setOffset(options.offset + options.limit);
    },
    [isPublic]
  );

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad, isPublic]);

  //  const handleLoadMore = async () => {
  //    await handleLoad({ order, offset, limit: LIMIT });
  //  };

  const handleTabChange = (isPublicValue) => {
    setIsPublic(isPublicValue);
    setOffset(0);
    handleLoad({ order, offset: 0, limit: LIMIT });
  };

  return (
    <div style={{ fontFamily: "Spoqa Han Sans Neo, Sans-Serif" }}>
      <div className="cardGroupPage">
        <MakeGroupButton />
        <div className="sortBar">
          <Tab onFilter={handleFilter} onTabChange={handleTabChange} />
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
