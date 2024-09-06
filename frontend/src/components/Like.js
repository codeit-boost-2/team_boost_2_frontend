import LikeIcon from "../assets/LikeIcon.jpg"
import "./Like.css";
const style={
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: "12px 40px",
    borderRadius: "5px",
    fontFamily: "Spoqa Han Sans Neo, Sans-Serif",
    fontWeight: "500",
    fontSize: "15px",
};

function Like({handleLikeClick}){
    
    return(
        <>
        {/* <img src={LikeIcon} 
             alt="테스트" 
             className={`fade ${isVisible ? 'visible' : ''}`} 
            /> */}
        <button className="gonggam" onClick={handleLikeClick}>
            <img style={{padding : "4px"}} alt="icon" src={LikeIcon} />
            공감 보내기
        </button>
        </>
    );
}

export default Like;