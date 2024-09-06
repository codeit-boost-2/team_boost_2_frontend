//공개, 비공개 탭 기능
//mock 데이터 추후 제거
//import items from "../api/memorymock.json";
import "./Tab.css";


function Tab({ handleTrue, handleFalse, isPublic }) {

  return (
    <div>
      <div className="publicOptionTab">
        <button
          onClick={handleTrue}
          className={isPublic === true ? "active" : ""}
        >
          공개
        </button>
        <button
          onClick={handleFalse}
          className={isPublic === false ? "active" : ""}
        >
          비공개
        </button>
      </div>
    </div>
  );
}

export default Tab;
