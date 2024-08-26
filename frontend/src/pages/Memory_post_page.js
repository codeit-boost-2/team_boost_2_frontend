import { useState } from "react";
import { useNavigate } from "react-router-dom";

const inputStyle={
    display:'flex', 
    justifyContent: "center",
    alignItems: "center", 
    width:'400px',
    height: '40px',
    border: '1px solid #dcdcdc',
    borderRadius: '5px',
    marginTop:'10px',
}

function FileInput(){
  const [value, setValues]=useState();

  const handleChange =(e)=>{
    const nextValue =e.target.files[0];
    setValues(nextValue);
  };

  return <input type="file" onChange={handleChange} />;

}


function MemoryPostPage(){

    const [values, setValues] = useState({
        name: '',
        title: '',
        image: '',
        body: '',
        tag: '',
        place: '',
        date: '',
        option: '',
        password: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };
    
      // 이전 페이지로 이동
    const navigate = useNavigate();
    const onCancel = () => {
    navigate(-1); 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({values});
      };

    return(
        <>
        <div style={{display: 'flex', flexDirection:'row', paddingLeft:'50px'}}>
        <h3 style={{marginTop:'200px'}}>추억 올리기</h3>
        <button onClick={onCancel} style={{marginTop:'200px'}}>x</button>
        </div>
        <form>
            <div style={{display: 'flex', flexDirection:'row'}}>
                <div style={{flexBasis:'50%', marginLeft:'50px'}}>
                    닉네임
                    <input style={inputStyle} 
                      name="name" 
                      value={values.name} 
                      onChange={handleChange} 
                      placeholder='닉네임을 입력해 주세요.'/>

                    제목
                    <input style={inputStyle} 
                      name="title" 
                      value={values.title} 
                      onChange={handleChange} 
                      placeholder='제목을 입력해 주세요.'/> 

                    이미지
                    <FileInput style={inputStyle} 
                    /*name="image" 
                    value={values.iamge} 
                    onChange={handleChange}*/ 
                    placeholder='파일을 선택해 주세요.'/> 

                    본문    
                    <input style={inputStyle} 
                    name="body" 
                    value={values.body} 
                    onChange={handleChange} 
                    placeholder='본문 내용을 입력 해 주세요.'/> 
                </div>
                <div style={{flexBasis:'50%'}}>
                    태그
                    <input style={inputStyle} 
                    name="tag" 
                    value={values.tag} 
                    onChange={handleChange} 
                    placeholder='태그를 입력 해 주세요.'/> 

                    장소
                    <input style={inputStyle} 
                    name="place"
                    value={values.place} 
                    onChange={handleChange} 
                    placeholder='장소를 입력 해 주세요.'/> 

                    추억의 순간
                    <input style={inputStyle} 
                    type="date" 
                    name="date" 
                    value={values.date} 
                    onChange={handleChange} 
                    placeholder='YYYY-MM-DD'/> 

                    추억 공개 선택
                    <input style={inputStyle} 
                    name="option" 
                    value={values.option} 
                    onChange={handleChange} 
                    placeholder='공개/비공개'/> 

                    비밀번호 생성
                    <input style={inputStyle} 
                    name="password" 
                    value={values.password} 
                    onChange={handleChange} 
                    placeholder='추억 비밀번호를 생성해 주세요.'/> 
                </div>
            </div>
            <button type='submit' onClick={handleSubmit}>올리기</button>
            </form>

            

        </>
    )
}

export default MemoryPostPage;