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
  const location = useLocation();
  const groupInstance = location.state;
  const { GroupId } = useParams();
  const [order, setOrder] = useState ("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [info, setInfo] = useState("");
  const [memories, setMemories] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isPublic,setIsPublic] = useState(true);
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
  
  //grouppage (그룹정보 추억 : 그룹 id필요)
  // const handleLoad = async () =>{
  //   const url=`http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups/${GroupId}/1/10?isPublic=${isPublic}`;
  //   axios.get(url)
  //   .then((res)=>{
  //     setInfo(res.data.group);
  //     setMemories(res.data.memories.data);
  //     setFilteredItems(res.data.memories.data)
  //   })
  //   .catch(error => {console.log(error)})
  // }

  
  const url=`http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups/${GroupId}/1/10?isPublic=${isPublic}`;

  useEffect(()=>{
    const handleLoad = async () =>{
      axios.get(url)
      .then((res)=>{
        setInfo(res.data.group);
        setMemories(res.data.memories.data);
        setFilteredItems(res.data.memories.data)
      })
      .catch(error => {console.log(error)})
    }
    handleLoad();
  },[url, isPublic])
  console.log(memories)//공개 비공개 추억 합산 필요
  
  return (
    <div style={pageStyle}>
      <Info items={groupInstance.item}/>
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
    </div>
  );
}

export default GroupPage;
