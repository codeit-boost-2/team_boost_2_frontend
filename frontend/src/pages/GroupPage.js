import Card from "../components/CardMemory.js";
import Info from "../components/Info.js";
import Gnb from "../components/Gnb.js";
import Button from "../components/Button.js";
import Tab from "../components/oldTab.js";
import Search from "../components/Search.js";
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
  marginTop: "200px",
};

function GroupPage() {
  return (
    <div style={pageStyle}>
      {/* <Gnb /> */}
      <Info />
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
      <div style={{ display: "flex", marginBottom: "40px" }}>
        <Tab />
        <Search />
      </div>
      <div className="feed" style={feedstyle}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default GroupPage;
