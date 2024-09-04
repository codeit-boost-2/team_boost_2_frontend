import CardMemory from "../components/Card_memory.js";
import Info from "../components/Info.js";
import Button from "../components/Button.js";
import Tab from "../components/oldTab.js";
import Search from "../components/Search.js";
import { useLocation, Link } from 'react-router-dom';
import axios from "axios";
import memories from "../api/memorymock.json";

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

function GroupPage() {
  
  //Link 태그로 받은 mock items
  const location = useLocation();
  const mock = location.state;

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
        <Link to="/MemoryPost">
          <Button />
        </Link>
      </div>
      <div style={{ display: "flex", marginBottom: "40px" }}>
        <Tab />
        <Search />
      </div>
      <div className="cardGroupList">
      {memories.length === 0 ? (
            "NO items"
          ) : (
            <CardMemory items={memories} />
          )}
          </div>
    </div>
  );
}

export default GroupPage;
