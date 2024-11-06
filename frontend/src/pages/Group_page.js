import CardMemory from "../components/Card_memory.js";
import Info from "../components/Info.js";
import Button from "../components/Button.js";
import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NoMemory from "../components/No_memory.js";
import SearchBar from "../components/Search_bar.js";
import Dropdown from "../components/Dropdown_menu.js";
import "./Group_page.css";

const style = {
  margin: "20px",
  display: "flex",
  fontFamily: "Spoqa Han Sans Neo, Sans-Serif",
  fontWeight: "600",
  justifyContent: "center",
  alignItems: "center",
};

const Buttonstyle = {
  display: "flex",
  fontFamily: "Spoqa Han Sans Neo, Sans-Serif",
  fontWeight: "600",
  justifyContent: "center",
  alignItems: "center",
  width: "20%",
  height: "40px",
  borderRadius: "4px",
  cursor: "pointer",
  backgroundColor: "white",
};

const pageStyle = {
  marginTop: "150px",
  marginLeft: "20px",
  marginRight: "20px",
};

const getSortedItems = (items, order) => {
  return [...items].sort((a, b) => {
    if (order === "createdAt") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (order === "likeCount") {
      return b.likeCount - a.likeCount;
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
  );
};

function GroupPage() {
  //Link 태그로 받은 items -> 그룹 아이디 받아야 됨
  //const location = useLocation();
  //const groupInstance = location.state;
  const { GroupId } = useParams();
  const [order, setOrder] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [info, setInfo] = useState("");
  const [badges, setBadges] = useState("");
  const [memories, setMemories] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [page, setPage] = useState(1);
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const sortedItems = useMemo(() => {
    const itemsAfterFilter = filterItemsBySearch(filteredItems, searchTerm);
    return getSortedItems(itemsAfterFilter, order);
  }, [filteredItems, order, searchTerm]);

  const handleSelect = (option) => {
    if (option === "최신순") setOrder("createdAt");
    else if (option === "공감순") setOrder("likeCount");
  };

  const handleTabTrue = () => {
    setIsPublic(true);
  };

  const handleTabFalse = () => {
    setIsPublic(false);
  };
  let perItem = 12;
  const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups/${GroupId}/${page}/${perItem}?isPublic=${isPublic}`;

  useEffect(() => {
    const handleLoad = async () => {
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          setInfo(res.data.group);
          setBadges(res.data.badge);
          setMemories(res.data.memories);
          setFilteredItems(res.data.memories.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    handleLoad();
  }, [url, isPublic, page]);

  const handleLoadBefore = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };
  const handleLoadAfter = () => {
    setPage(page + 1);
  };
  return (
    <div style={pageStyle}>
      <Info items={info} badge={badges} />
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
        <Link to="/MemoryPost" state={GroupId}>
          <Button />
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          width: "85%",
          gridTemplateColumns: "1fr 8fr 1fr",
          margin: "0 auto 20px",
          gap: "50px",
          justifyContent: "center",
        }}
      >
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
        <SearchBar
          onSearch={handleSearch}
          placeholderprop="제목을 입력해 주세요"
        />
        <Dropdown options={["최신순", "공감순"]} onSelect={handleSelect} />
      </div>
      <div className="cardGroupList">
        {filteredItems.length === 0 ? (
          <NoMemory GroupId={GroupId} />
        ) : (
          <CardMemory items={sortedItems} />
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px auto",
          width: "1600px",
        }}
      >
        {page !== 1 && (
          <button className="pageButton" onClick={handleLoadBefore}>
            이전페이지
          </button>
        )}
        {page !== 1 && memories.currentPage !== memories.totalPages && (
          <div style={{ marginRight: "300px" }}></div>
        )}
        {memories.totalPages !== 0 &&
          memories.currentPage !== memories.totalPages && (
            <button className="pageButton" onClick={handleLoadAfter}>
              다음페이지
            </button>
          )}
      </div>
    </div>
  );
}

export default GroupPage;
