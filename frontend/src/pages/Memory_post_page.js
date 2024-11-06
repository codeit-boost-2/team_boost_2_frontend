import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Memory_post_page.css";
import Toggle from "../components/Toggle";
import axios from "axios";
import InputTag from "../components/Input_tag";

function FileInput({ name, value, onChange }) {
  const [placeholder, setPlaceholder] = useState(" 파일을 선택해 주세요.");

  const handleInputChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
    setPlaceholder(nextValue.name);
  };

  return (
    <>
      <div className="filebox">
        <input
          className="MPinput"
          style={{ width: "280px", marginLeft: "0" }}
          placeholder={placeholder}
          disabled="disabled"
        />
        <label htmlFor="file">파일 선택</label>
        <input type="file" id="file" onChange={handleInputChange} />
      </div>
    </>
  );
}

function MemoryPostPage() {
  const [values, setValues] = useState({
    nickname: "",
    title: "",
    image: null,
    body: "",
    tag: "",
    place: "",
    date: "",
    password: "",
  });
  const location = useLocation();
  const { GroupId } = location.state;
  const [isPublic, setisPublic] = useState(true);

  /* tag Input 관리 */
  const handleTagsChange = (newTags) => {
    setValues((prevValues) => ({
      ...prevValues,
      tag: newTags,
    }));
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  // 이전 페이지로 이동
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  // Enter키 누를 시 폼 제출 방지
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      values.nickname,
      values.title,
      values.body,
      values.place,
      values.date,
      values.password,
      values.image,
    ];

    if (requiredFields.includes("") || values.image === null) {
      alert("모든 필드를 채워 주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("groupId", GroupId);
    formData.append("nickname", values.nickname);
    formData.append("title", values.title);
    formData.append("content", values.body);
    if (values.tag.length === 0) {
      formData.append("hashtag[]", values.tag);
    } else {
      for (let tag of values.tag) {
        formData.append("hashtag[]", tag);
      }
    }
    formData.append("image", values.image);
    formData.append("location", values.place);
    formData.append("moment", values.date);
    formData.append("isPublic", isPublic);
    formData.append("password", values.password);

    axios
      .post(
        `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups/${GroupId}/posts`,
        formData
      )
      .then((res) => {
        console.log(res);
        alert("올리기 성공!");
        onCancel();
      })
      .catch((error) => {
        alert(error.status);
        console.log(error);
        navigate(-1);
      });
  };

  return (
    <>
      <div className="MPbox">
        <div style={{ marginTop: "170px" }}></div>
        <div className="MPtitle">
          <h3>추억 올리기</h3>
          <button className="close" onClick={onCancel}></button>
        </div>
        <form onKeyDown={handleKeyDown}>
          <div className="MPform">
            <div className="MPformLeft" style={{ flexBasis: "50%" }}>
              <div className="MPinputDsc">닉네임</div>
              <input
                className="MPinput"
                name="nickname"
                value={values.nickname}
                onChange={handleInputChange}
                placeholder=" 닉네임을 입력해 주세요."
                required
                /* 자동완성 비활성화 : autoComplete="off"*/
              />

              <div className="MPinputDsc">제목</div>
              <input
                className="MPinput"
                name="title"
                value={values.title}
                onChange={handleInputChange}
                placeholder=" 제목을 입력해 주세요."
                required
              />

              <div className="MPinputDsc">이미지</div>
              <FileInput
                name="image"
                value={values.image}
                onChange={handleChange}
                isChange={false}
              />

              <br />

              <div className="MPinputDsc">본문</div>
              <textarea
                className="MPinput"
                style={{ height: "100px" }}
                name="body"
                value={values.body}
                onChange={handleInputChange}
                placeholder=" 본문 내용을 입력 해 주세요."
                required
              />
            </div>

            <div className="MPformRight" style={{ flexBasis: "50%" }}>
              <div className="MPinputDsc">태그</div>
              <InputTag
                name="tag"
                value={values.tag}
                onChange={handleTagsChange}
              />

              <div className="MPinputDsc">장소</div>
              <input
                className="MPinput"
                name="place"
                value={values.place}
                onChange={handleInputChange}
                placeholder=" 장소를 입력 해 주세요."
                required
              />

              <div className="MPinputDsc">추억의 순간</div>
              <input
                className="MPinput"
                type="date"
                name="date"
                value={values.date}
                onChange={handleInputChange}
                placeholder=" YYYY-MM-DD"
                required
              />

              <div className="MPinputDsc">추억 공개 선택</div>
              <div style={{ marginLeft: "10px" }}>
                <Toggle isPublic={isPublic} onToggle={setisPublic} />
              </div>

              <div className="MPinputDsc">비밀번호 생성</div>
              <input
                className="MPinput"
                type="password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                placeholder=" 추억 비밀번호를 생성해 주세요."
                required
              />
            </div>
          </div>
          <div className="submitArea">
            <button
              className="submitButton"
              type="submit"
              onClick={handleSubmit}
            >
              올리기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MemoryPostPage;
