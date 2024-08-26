import React, { useRef, useState } from "react";
import "./Input_img.css";

function FileInput({ onFileChange, required = false }) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("파일을 선택해주세요");

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileChange(file);
    } else {
      setFileName("파일을 선택해주세요");
      onFileChange(null);
    }
  };

  return (
    <div className="coverImg">
      <div>대표 이미지</div>
      <div className="fileInput">
        <div className="fileName">{fileName}</div>
        <input
          className="fileInputButton"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg" // PNG, JPG만 허용 required={required}
        />
      </div>
    </div>
  );
}

export default FileInput;
