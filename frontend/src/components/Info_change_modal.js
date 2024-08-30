
//그룹 정보 수정 모달 창 열기
function InfoChangeModal({ setModal }){
    const closeModal= () => {
        setModal(false);
    }
    //버튼 onsubmit 기능 추가 필요
    return(
        <>
        <div className="modalBackground">
        <div className="modalContainer">
            <div className="modalHead">
            <h3 style={{marginBottom: '50px'}}>그룹 정보 수정</h3>
            <button style={{border: "none", backgroundColor:"transparent", marginBottom: '50px', fontSize:"30px", position: 'absolute', right: '30px'}} onClick={closeModal}>x</button>
            </div>
            <form>
                <div className="MPinputDsc">그룹명</div>
                <input className='MPinput' style={{margin: '10px'}} />
                <div className="MPinputDsc">대표 이미지</div>
                <input className='MPinput' style={{margin: '10px'}}/>
                <div className="MPinputDsc">그룹 소개</div>
                <input className='MPinput' style={{margin: '10px'}}/>
                <div className="MPinputDsc">그룹 공개 선택</div>
                <input className='MPinput' style={{margin: '10px'}}/>
                <div className="MPinputDsc">수정 권한 인증</div>
                <input className='MPinput' style={{margin: '10px'}}/>
                <button className='submitButton' style={{margin: '10px'}}>제출하기</button>
            </form>
        </div>
        </div>
        </>
    )
}
export default InfoChangeModal;