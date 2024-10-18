import { useNavigate } from "react-router-dom";
const style={
    position: 'absolute',
    left: '50%',
    top: '60%',
    transform: 'translate(-50%, -50%)'
    
}
const IMGstyle={
    position: 'absolute',
    left: '50%',
    top: '40%',
    transform: 'translate(-50%, -50%)',
    width: '325px',
    height: '325px'
}
const Buttonstyle={
    position: 'absolute',
    left: '50%',
    top: '80%',
    transform: 'translate(-50%, -50%)',
    fontFamily:"Spoqa Han Sans Neo, Sans-serif"
}

function ServerPage(){
    const navigate = useNavigate(); 
    const onClickButton = () => {
      navigate('/');
    };
    return (
    <>
    <img style={IMGstyle} src="../imgs/bomb.svg" alt="서버터짐" />
    <h1 style={style}>서버가 펑! 터져버렸어!!</h1>
    <button onClick={onClickButton} className="submitButton" style={Buttonstyle}>새로고침</button>
    </>
    )
}

export default ServerPage;