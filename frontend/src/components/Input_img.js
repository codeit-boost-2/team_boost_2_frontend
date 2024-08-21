import React, { useRef, useState } from "react";
import "./Input_img.css";

function FileInput({ onFileChange, required = false }) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("파일을 선택해주세요");

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        setFileName(file.name);
        onFileChange(file);
      } else {
        setFileName(
          "유효하지 않은 파일 형식입니다. PNG 또는 JPG만 허용됩니다."
        );
        onFileChange(null);
      }
    } else {
      setFileName("파일을 선택해주세요");
      onFileChange(null);
    }
  };

  // 파일 입력 필드 클릭 핸들러
  const handleButtonClick = () => {
    fileInputRef.current.click();
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
