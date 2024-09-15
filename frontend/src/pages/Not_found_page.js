import notfound from "../assets/404.png";
import { useNavigate } from "react-router-dom";
const style={
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
}

const Buttonstyle={
    position: 'absolute',
    left: '50%',
    top: '80%',
    transform: 'translate(-50%, -50%)',
    fontFamily:"Spoqa Han Sans Neo, Sans-serif"
}

function NotFoundPage(){
    const navigate = useNavigate(); 
    const onClickButton = () => {
      navigate('/');
    };
    return (
    <>
    <img style={style}src={notfound} alt="페이지없음" />
    <button onClick={onClickButton} className="submitButton" style={Buttonstyle}>메인 페이지로 돌아가기</button>
    </>
    )
}

export default NotFoundPage;