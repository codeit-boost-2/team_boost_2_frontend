import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Grouplist_page.css";
import items from "../api/mock.json";
import Dropdown from "../components/Dropdown_menu.js";
import CardGroup from "../components/Card_group.js";
import Tab from "../components/Tab.js";
import SearchBar from "../components/Search_bar.js";
import MakeGroupButton from "../components/Makegroup_button.js";
import NoGroup from "../components/No_group.js";
import LoadMoreButton from "../components/Loadmore_button.js";

// 한번에 로드할 아이템 수
const ITEMS_PER_PAGE = 8;

// title 일치 개수 확인
const countTitleOccurrences = (items) => {
  const titleCount = items.reduce((acc, item) => {
    acc[item.title] = (acc[item.title] || 0) + 1;
    return acc;
  }, {});
  return titleCount;
};

// 기능별 정렬
const getSortedItems = (items, order) => {
  const titleCount = countTitleOccurrences(items);

  return [...items].sort((a, b) => {
    if (order === "createdAt") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (order === "titleCount") {
      return (titleCount[b.title] || 0) - (titleCount[a.title] || 0);
    } else if (order === "likes") {
      return b.like - a.like;
    } else if (order === "badges") {
      return b.badges - a.badges;
    }
    return 0;
  });
};

//검색시 공백제거
const normalizeText = (text) => {
  return text.replace(/\s+/g, "").toLowerCase();
};
//검색기능
const filterItemsBySearch = (items, searchTerm) => {
  const normalizedSearchTerm = normalizeText(searchTerm);
  return items.filter((item) =>
    normalizeText(item.title).includes(normalizedSearchTerm)
  );
};

function GroupListPage() {
  const [order, setOrder] = useState("createdAt");
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  //필터링된 아이템 콜백
  const handleFilter = useCallback((filteredItems) => {
    setFilteredItems(filteredItems);
    setVisibleItems(ITEMS_PER_PAGE);
  }, []);

  //검색어에 따른 필터링
  const handleSearch = (term) => {
    setSearchTerm(term);
    setVisibleItems(ITEMS_PER_PAGE);
  };

  //필터링, 정렬 아이템
  const sortedItems = useMemo(() => {
    const itemsAfterFilter = filterItemsBySearch(filteredItems, searchTerm);
    return getSortedItems(itemsAfterFilter, order);
  }, [filteredItems, order, searchTerm]);

  const handleSelect = (option) => {
    if (option === "최신순") setOrder("createdAt");
    else if (option === "게시글 많은순") setOrder("titleCount");
    else if (option === "공감순") setOrder("likes");
    else if (option === "획득 배지순") setOrder("badges");
  };

  //더보기
  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + ITEMS_PER_PAGE);
  };

  const hasMoreItems = visibleItems < sortedItems.length;

  /* api 연결
  const handleLoad = async () => {
    const { memories } = await getMemories();
    setItems(memories);
  };

  useEffect(() => {
    handleLoad();
  }, []);
*/

  return (
    <div>
      <div className="cardGroupPage">
        <Link to="/makeGroup">
          <MakeGroupButton />
        </Link>
        <div className="sortBar">
          <Tab items={items} onFilter={handleFilter} />
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
      <LoadMoreButton onLoadMore={handleLoadMore} hasMoreItems={hasMoreItems} />
    </div>
  );
}

export default GroupListPage;
