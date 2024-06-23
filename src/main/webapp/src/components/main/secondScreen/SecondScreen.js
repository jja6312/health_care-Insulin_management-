import React, { useEffect, useState } from "react";
import { getEvents } from "../../../api/event/getEvents";
import { getNotices } from "../../../api/event/getNotices";

const SecondScreen = () => {
  const [eventList, setEventList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);
  useEffect(() => {
    setEventList(getEvents());
    setNoticeList(getNotices());
  }, []);

  useEffect(() => {
    console.log("eventList", eventList);
    console.log("noticeList", noticeList);
  }, [eventList, noticeList]);

  return <div className="dark:text-white">dd</div>;
};

export default SecondScreen;
