import { useState } from "react";
import "./FileInput.css";
function FileInput({name, value, onChange, isChange }){

    const fromWhere = isChange ? value : "파일을 선택해 주세요."

    const [placeholder, setPlaceholder] = useState(fromWhere);
    
    const handleInputChange =(e)=>{
      const nextValue = e.target.files[0];
      onChange(name, nextValue);
      setPlaceholder(nextValue.name);
    };
    
    return (
      <>
      <div className="filebox">
        <input className="MPinput" style={{width: '280px', marginLeft:'0'}}
        placeholder={placeholder}
        disabled='disabled'/> 
        <label htmlFor="file">
          파일 선택
        </label>
        <input type="file" id="file" onChange={handleInputChange} />
      </div>
      </>
      );
  
  }

  export default FileInput;
  