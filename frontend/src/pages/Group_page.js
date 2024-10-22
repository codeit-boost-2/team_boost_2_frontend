import CardMemory from "../components/Card_memory.js";
import Info from "../components/Info.js";
import Button from "../components/Button.js";
import { useState, useMemo, useEffect } from "react";
import { useLocation, useParams, Link } from 'react-router-dom';
import axios from "axios";
import NoMemory from "../components/No_memory.js";
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

// const feedstyle = {
//   display: "grid",
//   gridTemplateColumns: "repeat(4, 1fr)",
//   gridAutoRows: "561px",
//   margin: "12px",
//   gap: "10px",
// };

const pageStyle = {
  marginTop: "150px",
  marginLeft: "20px",
  marginRight: "20px"
};

const getSortedItems = (items, order) => {
  return [...items].sort((a, b) => {
    if (order === "createdAt") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } 
    else if (order === "likeCount") {
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
  ) 
};

function GroupPage() {
  
  //Link 태그로 받은 items -> 그룹 아이디 받아야 됨
  //const location = useLocation();
  //const groupInstance = location.state;
  const { GroupId } = useParams();
  const [order, setOrder] = useState ("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [info, setInfo] = useState("");
  const [badges, setBadges] = useState("");
  const [memories, setMemories] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isPublic,setIsPublic] = useState(true);
  const[page, setPage] = useState(1);
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
  
  const handleTabTrue = () =>{
    setIsPublic(true);
  }

  const handleTabFalse = () =>{
    setIsPublic(false);
  }
  let perItem = 12;
  let totalPage = Infinity;
  const url=`http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups/${GroupId}/${page}/${perItem}?isPublic=${isPublic}`;
  
  useEffect(()=>{
    const handleLoad = async () =>{
      axios.get(url)
      .then((res)=>{
        console.log(res.data);
        totalPage = res.data.memories.totalPages;
        setInfo(res.data.group);
        setBadges(res.data.badge);
        setMemories(res.data.memories);
        setFilteredItems(res.data.memories.data)
      })
      .catch(error => {console.log(error)})
    }
    handleLoad();
  },[url, isPublic, page])
  
  const handleLoadMore = () =>{
    setPage(page + 1);
  }

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
      <div style={{display: 'grid', width:'85%', gridTemplateColumns: '1fr 8fr 1fr', margin: '0 auto 20px', gap:"50px", justifyContent:"center"}}>
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
        <SearchBar onSearch={handleSearch}
        placeholderprop="제목을 입력해 주세요" />
          <Dropdown
            options={["최신순", "공감순"]}
            onSelect={handleSelect}
          />
      </div>
      <div className="cardGroupList">
      {filteredItems.length === 0 ? (
            <NoMemory GroupId={GroupId}/>
          ) : (
            <CardMemory items={sortedItems} />
          )}
          </div>
      {
        <button className="submitButton" 
        style={{width: '80%', margin: '20px auto', display:'flex', justifyContent:'center',alignItems:'center'}}
        onClick={handleLoadMore}>
          더보기
        </button>
      }
    </div>
  );
}

export default GroupPage;
