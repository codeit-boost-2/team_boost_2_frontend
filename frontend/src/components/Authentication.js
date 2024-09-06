    
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


function Authentication({ where }){

    const handleSubmit = (e) => {
        e.preventDefault();
        // get password from id
        // if id === password -> submit
        // else alert
      };
      
    return(
        <>
        <div style={pageStyle}>
            <div style={{margin:"20px", fontWeight:"700", fontSize:"30px"}}>비공개 {where}</div>
            <div style={{marginBottom:"30px", fontWeight:"300", fontSize:"17px"}}>비공개 {where}에 접근하기 위해 권한 확인이 필요합니다.</div>
            <form>
            <input style={inputStyle} placeholder='비밀번호를 입력해 주세요.'/>
            <button style={{marginTop : "30px"}} className="submitButton" type="submit" onSubmit={handleSubmit}>제출하기</button>
            </form>
        </div>
        </>
    )
}
export default Authentication;