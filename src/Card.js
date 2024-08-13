import sampleImg from './assets/img1.png';
import './Card.css';

function Card(){
    return(
        <>
        <div className='card'>
            <div className='cardImg'>
                <img src={sampleImg} alt="대표이미지"></img>
            </div>
            <div className='info'>
                <div className='dday'>D+364</div>
                <div className='line'></div>
                <div className='status'>공개</div>
            </div>
            <div className='title'>
                에델바이스
            </div>
            <div className='body'>
                서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.
            </div>
            <div className='footer'>
                획득뱃지, 추억, 그룹공감
            </div>
        </div>
        </>
    );
}

export default Card;