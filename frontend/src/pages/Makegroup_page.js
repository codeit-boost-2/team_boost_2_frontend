//import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Makegroup_page.css";
import axios from "axios";
import InputText from "../components/Input_text";
import FileInput from "../components/Input_img";
import InputBox from "../components/Input_box";
import InputPW from "../components/Input_password";
import Toggle from "../components/Toggle";
import Popup from "../components/Popup";

function MakeGroupPage() {
  const titleStyle = {
    marginTop: "170px",
    display: "flex",
    justifyContent: "center",
  };

  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState("");
  const [isPublic, setisPublic] = useState(true);
  const [password, setPassword] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    // formData로 서버로 전송할 데이터
    const formData = new FormData();
    formData.append("groupName", groupName);
    formData.append("groupImage", groupImage);
    formData.append("groupDescription", groupDescription);
    formData.append("isPublic", isPublic);
    formData.append("password", password);

    // formData를 서버로 전송
    /*********************/
    axios.post("/groups", formData);
    console.log("Form submitted:", {
      groupName,
      groupImage,
      groupDescription,
      isPublic,
      password: password,
    });

    const success = true; // 그룹 생성 성공 예시

    setIsSuccess(success);
    setIsPopupVisible(true); // 팝업 표시
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 style={titleStyle}>그룹 만들기</h2>

        <div className="inputInfo">
          <div className="inputItems">
            <InputText label="그룹명" onChange={setGroupName} required={true} />

            <FileInput onFileChange={setGroupImage} required={true} />

            <InputBox
              label="그룹 소개"
              value={groupDescription}
              onChange={setGroupDescription}
              required={true}
            />

            <Toggle isPublic={isPublic} onToggle={setisPublic} />

            <InputPW
              label="비밀번호"
              value={password}
              onChange={setPassword}
              required={true}
            />

            <button className="submitButton" type="submit">
              만들기
            </button>
          </div>
        </div>
      </form>

      {isPopupVisible && (
        <Popup isSuccess={isSuccess} onClose={handleClosePopup} />
      )}
    </>
  );
}

export default MakeGroupPage;
