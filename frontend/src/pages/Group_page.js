import CardMemory from "../components/Card_memory.js";
import Info from "../components/Info.js";
import Button from "../components/Button.js";
import Tab from "../components/Tab_memory.js";
import Search from "../components/Search.js";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useLocation, useParams, Link } from 'react-router-dom';
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
  ) 
};

function GroupPage() {
  
  //Link 태그로 받은 mock items -> 그룹 아이디 받아야 됨
  const location = useLocation();
  const groupInstance = location.state;
  const { GroupId } = useParams();

  const [order, setOrder] = useState ("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [info, setInfo] = useState("");
  const [memories, setMemories] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isPublic,setIsPublic] = useState(true);

  // const filteredItems = filteredItems.filter(
  //   (item) => item.groupid === mock.item.id
  // );

  // const handleFilter = useCallback((filteredItems) => {
  //   setFilteredItems(filteredItems);
  // }, []);

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
  const handleLoads = async () =>{
    const url=`http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups/771bb589-e76f-4ba1-bb2d-3e82008bc251/1/1?isPublic=true`;
    axios.get(url)
    .then((res)=>{
      setInfo(res.data.group);
      setMemories(res.data.memories.data);
      setFilteredItems(res.data.memories.data)
    })
    .catch(error => {console.log(error)})
  }
  useEffect(()=>{
    handleLoads();
  },[isPublic])
  return (
    <div style={pageStyle}>
      <Info items={groupInstance.item} length={memories.length}/>
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
      <div style={{display: 'grid', width:'85%', gridTemplateColumns: '1fr 8fr 1fr', margin: '0 auto', gap:"50px", justifyContent:"center"}}>
        <Tab handleTrue={handleTabTrue} handleFalse={handleTabFalse} isPublic={isPublic} />
        <SearchBar onSearch={handleSearch}
        placeholderprop="제목을 입력해 주세요" />
          <Dropdown
            options={["최신순", "공감순"]}
            onSelect={handleSelect}
          />
      </div>
      <div className="cardGroupList">
      {filteredItems.length === 0 ? (
            <NoMemory />
          ) : (
            <CardMemory items={sortedItems} />
          )}
          </div>
    </div>
  );
}

export default GroupPage;
