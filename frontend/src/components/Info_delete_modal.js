import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
//그룹 정보 삭제 모달 창 열기
function InfoDeleteModal({ setModal, id }){

    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const closeModal= () => {
        setModal(false);
    }

    const handleInputChange = (e) => {
        setPassword(e.target.value);
    };
    //버튼 onsubmit 기능 추가 필요
    const handleSubmit = (e)=>{
        e.preventDefault();
        const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups/${id}`
        axios.delete(url,
            {
                password
            },
        )
        .then(() => {navigate('/')})

    }
    return(
        <>
        <div className="modalBackground">
        <div className="modalContainer" style={{width:'500px', height:'300px'}}>
            <div className="modalHead">
            <h3 style={{marginBottom: '50px'}}>그룹 삭제</h3>
            <button style={{border: "none", cursor:"pointer", backgroundColor:"transparent", marginBottom: '50px', fontSize:"30px", position: 'absolute', right: '30px'}} onClick={closeModal}>x</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="MPinputDsc">삭제 권한 인증</div>
                <input className="MPinput"
                    value={password} 
                    onChange={handleInputChange} 
                    placeholder='비밀번호를 입력 해 주세요.'/> 
                <button className='submitButton' style={{margin: '10px'}} >제출하기</button>
            </form>
        </div>
        </div>
        </>
    )
}
export default InfoDeleteModal;