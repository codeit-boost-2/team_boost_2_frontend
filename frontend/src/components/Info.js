import Like from './Like.js';
import './Info.css';
import { useState } from "react";
import InfoChangeModal from "./Info_change_modal.js"
import InfoDeleteModal from "./Info_delete_modal.js"

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
    fontWeight: '400'
};

//그룹 정보 나타내는 info 컴포넌트
function Info(mock){
    const{
        name,
        image,
        description,
        isPublic,
        likeCount,
        memories,
        badges,
        createdAt,
      } = mock.items.item;
      console.log(mock.items.item)
    const [like, setLike] = useState(likeCount);
    const [changeModal, setChangeModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    
    const handleLikeClick = () => {
        const afterLike = like +1;
        setLike(afterLike);
    }
    const dday = calculateDaysDifference(createdAt);
    return(
        <>
        <div style={style}>
            <div className='infoImage'>
                {isPublic === true && image && (
                <img src={"." + image} alt='그룹이미지' />
                )}
            </div>     
            <div style={{flexGrow:'1', margin:'10px'}}>
                <div className='groupInfo'>
                    <div style={{display:'flex', flexDirection:'row'}}>
                    <div className='dday'>{dday}</div>
                    <div className='line'></div>
                    <div className='status'>{isPublic === true ? '공개' : '비공개'}</div>
                    </div>
                    <div>
                    <button className='infoButton' onClick={() => setChangeModal(!changeModal)}>그룹 정보 수정하기</button>
                    {
                        changeModal === true ? <InfoChangeModal items={mock.items.item} setModal={setChangeModal}/> : null
                    }
                    <button className='infoButton' style={{color:"gray"}} onClick={() => setDeleteModal(!deleteModal)}>그룹 삭제하기</button>
                    {
                        deleteModal === true ? <InfoDeleteModal setModal={setDeleteModal} /> : null
                    }
                    </div>
                </div>
                <div className='infoTitle'>
                    <h2>{name}</h2>
                    <div className='titleHeader'>
                        <div style={{padding:'0 20px'}}>추억 {memories}</div>
                        <div className='line'></div>
                        <div style={{paddingLeft:'10px'}}>그룹 공감 {like}</div>
                    </div>
                </div>
                <div className='infoBody'>
                    {description}
                </div>
                <div className='infoFooter'>
                    <div style={{fontWeight:'600', paddingBottom:'15px', fontSize:'15px'}}>
                    획득 배지
                    </div>
                    <div className='badge'>
                        <div>{badges}</div>
                        <Like handleLikeClick={handleLikeClick} isVisible={isVisible} />
                    </div>
                </div>
                
            </div>
           
        </div>
        </>
    );
}

export default Info;