import Like from './Like.js';
import './Info.css';
import { useState } from "react";

//D day 계산
function calculateDaysDifference(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);
  
    const difference = now - createdDate;
  
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  
    if (days === 0) {
      return "D+0";
    } else {
      return `D+${days}`;
    }
  }
  

const style={
    boxSizing:'border-box',
    display: 'flex',
    fontFamily: 'Spoqa Han Sans Neo, Sans-Serif',
    fontWeight: '400',
};


//그룹 정보 나타내는 info 컴포넌트
function Info(mock){

    const [like, setLike] = useState(mock.items.item.like);
    const handleLikeClick = () => {
        const afterLike = like +1;
        setLike(afterLike);
    }
    const dday = calculateDaysDifference(mock.items.item.createdAt);
    return(
        <>
        <div style={style}>
            <div className='infoImage'>
                {mock.items.item.option === "공개" && mock.items.item.img && (
                <img src={mock.items.item.img} alt='그룹이미지' />
                )}
            </div>     
            <div style={{flexGrow:'1', margin:'10px'}}>
                <div className='groupInfo'>
                    <div style={{display:'flex', flexDirection:'row'}}>
                    <div className='dday'>{dday}</div>
                    <div className='line'></div>
                    <div className='status'>{mock.items.item.option}</div>
                    </div>
                    <div>
                    <button className='infoButton'>그룹 정보 수정하기</button>
                    <button className='infoButton'>그룹 삭제하기</button>
                    </div>
                </div>
                <div className='infoTitle'>
                    <h2>{mock.items.item.title}</h2>
                    <div className='titleHeader'>
                        <div style={{padding:'0 20px'}}>추억 {mock.items.item.memories}</div>
                        <div className='line'></div>
                        <div style={{paddingLeft:'10px'}}>그룹 공감 {like}</div>
                    </div>
                </div>
                <div className='infoBody'>
                    {mock.items.item.content}
                </div>
                <div className='infoFooter'>
                    <div style={{fontWeight:'600', paddingBottom:'15px', fontSize:'15px'}}>
                    획득 배지
                    </div>
                    <div className='badge'>
                        <div>{mock.items.item.badges}</div>
                        <Like handleLikeClick={handleLikeClick} />
                    </div>
                </div>
                
            </div>
           
        </div>
        </>
    );
}

export default Info;