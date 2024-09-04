import { Link } from "react-router-dom";
//원형 모양의 버튼
/*
const style={
    borderRadius: '5px',
    backgroundColor:'black',
    fontFamily: 'Spoqa Han Sans Neo, Sans-Serif',
    fontWeight: '400',
    justifyContent:'center',
    color:'white',
    padding:'10px 60px',
    marginLeft:'auto'
};
*/
function Button(){
    
    return(
        <Link to="/MemoryPost">
        <button className="submitButton" style={{width: '200px', padding:'10px 60px',
            marginLeft:'auto'}}>추억 올리기</button>
        </Link>
    );
}

export default Button;