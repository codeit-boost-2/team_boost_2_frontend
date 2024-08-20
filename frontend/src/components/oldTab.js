const styleA={
    borderRadius: '9999px',
    padding:'12px 16px',
    backgroundColor:'white',
    border:'none',
    fontFamily: "Spoqa Han Sans Neo, Sans-Serif",
    fontWeight: "500",
};

const styleB={
    borderRadius: '9999px',
    padding:'12px 16px',
    backgroundColor:'black',
    color:'white',
    border:'none',
    fontFamily: "Spoqa Han Sans Neo, Sans-Serif",
    fontWeight: "400",
};

function Tab(){
    return(
    <>
        <button style={{...styleB, marginLeft:'20px'}}>공개</button>
        <button style={styleA}>비공개</button>
    </>
    );
}

export default Tab;