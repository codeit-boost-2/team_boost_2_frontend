import { useEffect, useState, useMemo, useCallback } from "react";
import "./Grouplist_page.css";
import { getGroups } from "../api/api.js";
import useAsync from "../hooks/useAsync";
import Dropdown from "../components/Dropdown_menu.js";
import CardGroup from "../components/Card_group.js";
import Tab from "../components/Tab.js";
import SearchBar from "../components/Search_bar.js";
import MakeGroupButton from "../components/Makegroup_button.js";
import NoGroup from "../components/No_group.js";
import LoadMoreButton from "../components/Loadmore_button.js";

const LIMIT = 8;

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
    normalizeText(item.name).includes(normalizedSearchTerm)
  );
};

function GroupListPage() {
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [getGroupsAsync] = useAsync(getGroups);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleItems, setVisibleItems] = useState(LIMIT);

  const handleFilter = useCallback((filteredItems) => {
    setFilteredItems(filteredItems);
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
    else if (option === "게시글 많은순") setOrder("memories");
    else if (option === "공감순") setOrder("likeCount");
    else if (option === "획득 배지순") setOrder("badges");
  };

  const handleLoad = useCallback(
    async (options) => {
      const result = await getGroupsAsync(options);
      if (!result) return;

      const { paging, groups } = result;
      if (options.offset === 0) {
        setFilteredItems(groups);
      } else {
        setFilteredItems((prevItems) => [...prevItems, ...groups]);
      }
      setOffset(options.offset + options.limit);
      setHasNext(paging.hasNext);
    },
    [getGroupsAsync]
  );

  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    console.log("getGroupsAsync:", getGroupsAsync);
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad, getGroupsAsync]);

  return (
    <div style={{ fontFamily: "Spoqa Han Sans Neo, Sans-Serif" }}>
      <div className="cardGroupPage">
        <MakeGroupButton />
        <div className="sortBar">
          <Tab items={filteredItems} onFilter={handleFilter} />
          <SearchBar onSearch={handleSearch} />
          <Dropdown
            options={["최신순", "게시글 많은순", "공감순", "획득 배지순"]}
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
      {hasNext && <LoadMoreButton onClick={handleLoadMore} />}
    </div>
  );
}

export default GroupListPage;
