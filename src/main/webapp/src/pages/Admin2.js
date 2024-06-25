import React, { useState, useEffect } from "react";
import { createNotice } from "../api/event/createNotice";

// notice 작성페이지
const Admin2 = () => {
  const [noticeDTO, setNoticeDTO] = useState({
    empId: "",
    title: "",
    content: "",
    hyperlink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoticeDTO({
      ...noticeDTO,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 이벤트 방지
    try {
      await createNotice(noticeDTO);
      console.log("비정기알람 등록 성공");
      alert("비정기알람 등록 성공");
      // dto 리셋
      setNoticeDTO({
        title: "",
        content: "",
      });
    } catch (error) {
      console.error("비정기알람 등록에 문제가 있습니다.", error);
    }
  };

  useEffect(() => {
    console.log("noticeDTO", noticeDTO);
  }, [noticeDTO]);

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <input
        className="border-2 border-black w-10/12"
        value={noticeDTO.empId}
        onChange={handleChange}
        type="text"
        name="empId"
        placeholder="사원번호"
      />
      <input
        className="border-2 border-black w-10/12"
        value={noticeDTO.title}
        onChange={handleChange}
        type="text"
        placeholder="비정기알람 제목"
        name="title"
      />
      <textarea
        className="border-2 border-black w-10/12"
        value={noticeDTO.content}
        onChange={handleChange}
        placeholder="내용"
        name="content"
      />
      <input
        className="border-2 border-black w-10/12"
        value={noticeDTO.hyperlink}
        onChange={handleChange}
        type="text"
        placeholder="링크"
        name="hyperlink"
      />

      <button className="bg-blue-400 rounded-xl w-10/12" onClick={handleSubmit}>
        등록
      </button>
    </div>
  );
};

export default Admin2;
