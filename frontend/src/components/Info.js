import Like from './Like.js';
import sampleImg from '../assets/img2.png'
import './Info.css';
import { useState } from "react";

const style={
    boxSizing:'border-box',
    display: 'flex',
    fontFamily: 'Spoqa Han Sans Neo, Sans-Serif',
    fontWeight: '400',
};

function Info(){

    const [like, setLike] = useState(0);
    const handleLikeClick = () => {
        const afterLike = like +1;
        setLike(afterLike);
    }

    return(
        <>
        <div style={style}>
            <div className='infoImage'>
                <img alt='그룹이미지' src={sampleImg} />
            </div>
            <div style={{flexGrow:'1', margin:'10px'}}>
                <div className='groupInfo'>
                    <div style={{display:'flex', flexDirection:'row'}}>
                    <div className='dday'>D+364</div>
                    <div className='line'></div>
                    <div className='status'>공개</div>
                    </div>
                    <div>
                    <button className='infoButton'>그룹 정보 수정하기</button>
                    <button className='infoButton'>그룹 삭제하기</button>
                    </div>
                </div>
                <div className='infoTitle'>
                    <h2>달봉이네 가족</h2>
                    <div className='titleHeader'>
                        <div style={{padding:'0 20px'}}>추억 8</div>
                        <div className='line'></div>
                        <div style={{paddingLeft:'10px'}}>그룹 공감 {like}</div>
                    </div>
                </div>
                <div className='infoBody'>
                    서로 한마음으로 응원하고 아끼는 달봉이네 가족입니다.
                </div>
                <div className='infoFooter'>
                    <div style={{fontWeight:'600', paddingBottom:'15px', fontSize:'15px'}}>
                    획득 배지
                    </div>
                    <div className='badge'>
                        <div>뱃지</div>
                        <Like handleLikeClick={handleLikeClick} />
                    </div>
                </div>
                
            </div>
           
        </div>
        </>
    );
}

export default Info;