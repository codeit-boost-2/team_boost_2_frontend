import notfound from "../assets/404.png";

const style={
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
}

function NotFoundPage(){
    return <img style={style}src={notfound} alt="페이지없음" />
}

export default NotFoundPage;