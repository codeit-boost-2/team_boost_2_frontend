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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ values });
    onClose();
  };

  return (
    <div className="EditPopupOverlay">
      <div className="EditPopup">
        <h2 className="EditPopup-title">추억 수정하기</h2>
        <button className="Cancel-button" onClick={onClose}>
          x
        </button>
        <form className="EditPopup-Form">
          <div className="EditPopup-Left">
            <div>
              닉네임
              <input
                style={inputStyle}
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="닉네임을 입력해주세요."
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
              />
            </div>
            <div>
              이미지
              <FileInput />
            </div>
            <div>
              본문
              <input
                style={inputStyle}
                name="body"
                value={values.body}
                onChange={handleChange}
                placeholder="본문 내용을 입력 해 주세요."
              />
            </div>
          </div>
          <div className="EditPopup-Right">
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
