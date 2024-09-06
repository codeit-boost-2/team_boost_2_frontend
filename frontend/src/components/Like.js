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

function Like(props){
    
    return(
        <button className="gonggam" onClick={props.handleLikeClick}>
            <img style={{padding : "4px"}} alt="icon" src={LikeIcon} />
            공감 보내기
        </button>
    );
}

export default Like;