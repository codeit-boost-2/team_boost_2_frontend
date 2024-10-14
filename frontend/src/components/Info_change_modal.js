import { useState } from "react";
import FileInput from "./FileInput";
import Toggle from "./Toggle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//그룹 정보 수정 모달 창 열기
function InfoChangeModal({ setModal, items }){
  const navigate = useNavigate();
  const [values, setValues] = useState(items);
  const [isPublic, setisPublic] = useState(values.isPublic);
  const [isChanged, setisChanged] = useState(false);
  const [password, setPassword] = useState('');
    const closeModal= () => {
          setModal(false);
      }
    const handleImageChange = (name, value) => {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
      setisChanged(true);
    }
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };  
  
    const handleSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.introduction);
      formData.append("isPublic", isPublic);
      formData.append("password", password);
      if(isChanged){
        formData.append("image", values.image);
      }
      for (const x of formData) {
        console.log(x);
       };
       const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups/${items.id}`
       console.log(url);
       axios.put(url,formData)
       .then(res=>{
        if(res.status === 200)
        {
          alert("수정에 성공했습니다!");
          navigate(0);   
        }})
       .catch(error => {
        if(error.status === 403)
        {
          alert("잘못된 비밀번호 입니다.")
        }
        else{
          console.log(error);
        }
      })
    };

    return(
        <>
        <div className="modalBackground">
        <div className="modalContainer">
            <div className="modalHead">
            <h3 style={{marginBottom: '50px'}}>그룹 정보 수정</h3>
            <button style={{border: "none", backgroundColor:"transparent", cursor:"pointer", marginBottom: '50px', fontSize:"30px", position: 'absolute', right: '30px'}} onClick={closeModal}>x</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="MPinputDsc">그룹명</div>
                <input className='MPinput' name="name" value={values.name} onChange={handleInputChange} style={{margin: '10px'}} />
                <div className="MPinputDsc">대표 이미지</div>
                <FileInput 
                    name="image" 
                    value={values.image} 
                    onChange={handleImageChange}
                    isChange={true}/> 
                <div className="MPinputDsc">그룹 소개</div>
                <input className='MPinput' name="introduction" value={values.introduction} onChange={handleInputChange} style={{margin: '10px'}}/>
                
                <div className="MPinputDsc">그룹 공개 선택</div>
                <div style={{marginLeft: '10px'}}>
                <Toggle isPublic={isPublic} onToggle={setisPublic}/>
                </div>
                
                <div className="MPinputDsc">수정 권한 인증</div>
                <input className='MPinput' style={{margin: '10px'}} name="password" value={password} 
                onChange={(e) => {setPassword(e.target.value)}}/>
                
                <button className='submitButton' style={{margin: '10px'}}>제출하기</button>
            </form>
        </div>
        </div>
        </>
    )
}
export default InfoChangeModal;