import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Edit_memory_popup.css";
import Toggle from "./Toggle.js";
import FileInput from "./FileInput.js";

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

function EditMemoryPopup({ items, onClose }) {
  const { MemoryId } = useParams();
  const [isChanged, setisChanged] = useState(false);
  const [password, setPassword] = useState("");
  const [values, setValues] = useState(items);
  const [isPublic, setIsPublic] = useState(values.isPublic);
  const Navigate = useNavigate();

  console.log(MemoryId);
  console.log(items);
  const handleImageChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setisChanged(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nickname", values.nickname);
    formData.append("title", values.title);
    if (isChanged) {
      formData.append("image", values.image);
    }
    formData.append("content", values.content);
    formData.append("tag", []);
    formData.append("location", values.location);
    formData.append("moment", values.moment);
    formData.append("isPublic", isPublic);
    formData.append("password", password);
    for (const x of formData) {
      console.log(x);
    }

    axios
      .put(
        `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/memories/${MemoryId}`,
        formData
      )
      .then((res) => {
        if (res.status === 200) {
          alert("수정에 성공했습니다!");
          onClose();
          Navigate(0);
        }
      })
      .catch((error) => {
        if (error.status === 403) {
          alert("잘못된 비밀번호 입니다.");
        } else if (error.status === 404) {
          alert(error.status);
          onClose();
          Navigate("*");
        } else if (error.status === 500) {
          alert("모든 정보를 입력해주세요.");
        } else {
          alert(error.status);
          console.log(error);
          Navigate(0);
        }
      });
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
                name="nickname"
                value={values.nickname}
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
              <FileInput
                name="image"
                value={values.image}
                onChange={handleImageChange}
                isChange={true}
              />
            </div>
            <div>
              본문
              <textarea
                style={inputContentStyle}
                name="content"
                value={values.content}
                onChange={handleChange}
                placeholder="본문 내용을 입력 해 주세요."
                required
              />
            </div>
          </div>
          <div className="EditMemoryPopup-Right">
            <div>
              {/* 태그
              <inputTag
                style={inputStyle}
                name="tag"
                value={values.tag}
                onChange={handleChange}
                placeholder="태그를 입력 해 주세요."
              /> */}
            </div>
            <div>
              장소
              <input
                style={inputStyle}
                name="location"
                value={values.location}
                onChange={handleChange}
                placeholder="장소를 입력 해 주세요."
              />
            </div>
            <div>
              추억의 순간
              <input
                style={inputStyle}
                type="date"
                name="moment"
                value={values.moment}
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
                type="password"
                style={inputStyle}
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
