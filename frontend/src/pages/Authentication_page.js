import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const pageStyle = {
    marginTop: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    fontFamily: "Spoqa Han Sans Neo, Sans-Serif",
    fontWeight: "500",
    fontSize: "15px",
};

const inputStyle={
    display:'flex', 
    justifyContent: "center",
    alignItems: "center", 
    width:'400px',
    height: '40px',
    border: '1px solid #dcdcdc',
    borderRadius: '5px',
    marginTop:'10px',
};

function AuthenticationPage(){
    const location = useLocation();
    const items = location.state;
    const groupId = items.item.id;
    const where = "페이지"
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/${groupId}/verifyPassword`, password)
        .then((res) => {console.log(res);})
        .catch((error) => {console.log(error);})
      };
      
    return(
        <>
        <div style={pageStyle}>
            <div style={{margin:"20px", fontWeight:"700", fontSize:"30px"}}>비공개 {where}</div>
            <div style={{marginBottom:"30px", fontWeight:"300", fontSize:"17px"}}>비공개 {where}에 접근하기 위해 권한 확인이 필요합니다.</div>
            <form onSubmit={handleSubmit}>
            <input 
            style={inputStyle} 
            placeholder='비밀번호를 입력해 주세요.'
            value={password}
            onChange={e => {setPassword(e.target.value)}}/>
            <button style={{marginTop : "30px"}} className="submitButton" type="submit">제출하기</button>
            </form>
        </div>
        </>
    )
}
export default AuthenticationPage;