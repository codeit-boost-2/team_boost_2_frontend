import { useState } from "react";
import FileInput from "./FileInput";
import Toggle from "./Toggle";
//그룹 정보 수정 모달 창 열기
function InfoChangeModal({ setModal, items }){
  const [values, setValues] = useState(items);
  const [isPublic, setisPublic] = useState(values.isPublic);
    const closeModal= () => {
          setModal(false);
      }

    const handleChange = (name, value) => {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      handleChange(name, value);
    };  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({values});
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
                    onChange={handleChange}
                    isChange={true}/> 
                <div className="MPinputDsc">그룹 소개</div>
                <input className='MPinput' name="description" value={values.description} onChange={handleInputChange} style={{margin: '10px'}}/>
                
                <div className="MPinputDsc">그룹 공개 선택</div>
                <div style={{marginLeft: '10px'}}>
                <Toggle isPublic={isPublic} onToggle={setisPublic}/>
                </div>
                
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