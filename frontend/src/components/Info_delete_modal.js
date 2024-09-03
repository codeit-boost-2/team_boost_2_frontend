//import Modal from "react-modal"; //npm i react-modal로 사용할 수 있는 패키지-> 시간되면 사용해보기...(멋슥)
//그룹 정보 삭제 모달 창 열기
function InfoDeleteModal({ setModal }){
    const closeModal= () => {
        setModal(false);
    }
    //버튼 onsubmit 기능 추가 필요
    return(
        <>
        <div className="modalBackground">
        <div className="modalContainer" style={{width:'500px', height:'300px'}}>
            <div className="modalHead">
            <h3 style={{marginBottom: '50px'}}>그룹 삭제</h3>
            <button style={{border: "none", cursor:"pointer", backgroundColor:"transparent", marginBottom: '50px', fontSize:"30px", position: 'absolute', right: '30px'}} onClick={closeModal}>x</button>
            </div>
            <form>
                <div className="MPinputDsc">삭제 권한 인증</div>
                <input className='MPinput' style={{margin: '10px'}}/>
                <button className='submitButton' style={{margin: '10px'}}>제출하기</button>
            </form>
        </div>
        </div>
        </>
    )
}
export default InfoDeleteModal;