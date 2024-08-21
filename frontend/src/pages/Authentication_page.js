
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

function AuthenticationPage(){
    return(
        <>
        <div style={pageStyle}>
            <div style={{margin:"20px", fontWeight:"700", fontSize:"30px"}}>비공개 추억</div>
            <div style={{marginBottom:"20px", fontWeight:"300", fontSize:"17px"}}>비공개 추억에 접근하기 위해 권한 확인이 필요합니다.</div>
            <form>
                비밀번호
            </form>
        </div>
        </>
    )
}

export default AuthenticationPage;