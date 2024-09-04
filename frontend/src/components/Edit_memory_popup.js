import React, { useState } from "react";
import "./Edit_memory_popup.css";
import Toggle from "./Toggle.js";
import FileInput from "./Input_img.js";

const inputStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "400px",
  height: "40px",
  border: "1px solid #dcdcdc",
  borderRadius: "5px",
  marginTop: "10px",
};

const inputContentStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "400px",
  height: "150px",
  border: "1px solid #dcdcdc",
  borderRadius: "5px",
  marginTop: "10px",
};

function EditMemoryPopup({ onClose }) {
  const [isPublic, setIsPublic] = useState(true);
  const [values, setValues] = useState({
    name: "",
    title: "",
    image: "",
    body: "",
    tag: "",
    place: "",
    date: "",
    option: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 폼 유효성 검사
  const validateForm = () => {
    const requiredFields = ["name", "title", "body", "date", "password"];
    for (let field of requiredFields) {
      if (!values[field]) {
        alert("내용을 입력해 주세요.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log({ values });
      onClose();
    }
  };

  return (
    <div className="EditMemoryPopupOverlay">
      <div className="EditMemoryPopup">
        <h2 className="EditMemoryPopup-title">추억 수정하기</h2>
        <button className="Cancel-button" onClick={onClose}>
          x
        </button>
        <form className="EditMemoryPopup-Form">
          <div className="EditMemoryPopup-Left">
            <div>
              닉네임
              <input
                style={inputStyle}
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="닉네임을 입력해주세요."
                required
              />
            </div>
            <div>
              제목
              <input
                style={inputStyle}
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="제목을 입력해 주세요."
                required
              />
            </div>
            <div>
              이미지
              <FileInput />
            </div>
            <div>
              본문
              <textarea
                style={inputContentStyle}
                name="body"
                value={values.body}
                onChange={handleChange}
                placeholder="본문 내용을 입력 해 주세요."
                required
              />
            </div>
          </div>
          <div className="EditMemoryPopup-Right">
            <div>
              태그
              <input
                style={inputStyle}
                name="tag"
                value={values.tag}
                onChange={handleChange}
                placeholder="태그를 입력 해 주세요."
              />
            </div>
            <div>
              장소
              <input
                style={inputStyle}
                name="place"
                value={values.place}
                onChange={handleChange}
                placeholder="장소를 입력 해 주세요."
              />
            </div>
            <div>
              추억의 순간
              <input
                style={inputStyle}
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
                placeholder="YYYY-MM-DD"
                required
              />
            </div>
            <div>
              추억 공개 선택
              <Toggle isPublic={isPublic} onToggle={setIsPublic} />
            </div>
            <div>
              수정 권한 인증
              <input
                style={inputStyle}
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력해 주세요."
                required
              />
            </div>
          </div>
        </form>
        <div className="submit">
          <button className="submitButton" type="submit" onClick={handleSubmit}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditMemoryPopup;
