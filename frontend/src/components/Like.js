import LikeIcon from "../assets/LikeIcon.jpg"

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
        <button style={style} onClick={props.handleLikeClick}>
            <img style={{padding : "4px"}} alt="icon" src={LikeIcon} />
            공감 보내기
        </button>
    );
}

export default Like;