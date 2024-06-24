import React, { useEffect, useState, useRef } from "react";
import { createEvent } from "../api/event/createEvent";
import { Link } from "react-router-dom";

const Admin = () => {
  const [eventDTO, setEventDTO] = useState({
    title: "",
    content: "",
    image: "",
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDTO({
      ...eventDTO,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEventDTO({
        ...eventDTO,
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 이벤트 방지
    try {
      await createEvent(eventDTO);
      console.log("이벤트 등록 성공");
      alert("이벤트 등록 성공");
      // dto 리셋
      setEventDTO({
        title: "",
        content: "",
        image: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("이벤트 등록에 문제가 있습니다.", error);
    }
  };

  useEffect(() => {
    console.log("eventDTO", eventDTO);
  }, [eventDTO]);

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <input
        className="border-2 border-black w-10/12"
        value={eventDTO.title}
        onChange={handleChange}
        type="text"
        placeholder="제목"
        name="title"
      />
      <textarea
        className="border-2 border-black w-10/12"
        value={eventDTO.content}
        onChange={handleChange}
        placeholder="내용"
        name="content"
      />
      <input
        ref={fileInputRef}
        onChange={handleImageChange}
        type="file"
        name="image"
      />
      <button className="bg-blue-400 rounded-xl w-10/12" onClick={handleSubmit}>
        등록
      </button>
      <Link to="/admin2">
        <span className="text-blue-500 underline">
          비정기메시지 보내기로 이동
        </span>
      </Link>
    </div>
  );
};

export default Admin;
