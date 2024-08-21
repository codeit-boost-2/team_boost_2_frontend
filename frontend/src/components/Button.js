//원형 모양의 버튼
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

function Button(){
    
    return(
        <button style={style}>추억 만들기</button>
    );
}

export default Button;