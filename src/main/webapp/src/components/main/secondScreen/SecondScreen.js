import React, { useEffect, useState } from "react";
import { getEvents } from "../../../api/event/getEvents";
import { getNotices } from "../../../api/event/getNotices";
import EventOrNoticeElement from "./EventOrNoticeElement";

const SecondScreen = () => {
  const [eventList, setEventList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    const fetchEventsAndNotices = async () => {
      try {
        const events = await getEvents();
        const notices = await getNotices();
        setEventList(events);
        setNoticeList(notices);
      } catch (error) {
        console.error("Error fetching events and notices:", error);
      }
    };

    fetchEventsAndNotices();
  }, []);

  useEffect(() => {
    console.log("eventList", eventList);
    console.log("noticeList", noticeList);
  }, [eventList, noticeList]);

  const sortedEventList = eventList.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="flex flex-col justify-center items-center dark:text-white gap-6">
      <div>
        <span className="text-[27px] text-nhgreen font-extrabold">
          알림/공지사항
        </span>
      </div>
      <div className="w-10/12 flex justify-end">
        <span>알림 전체 확인</span>
      </div>
      {sortedEventList?.map((event) => (
        <EventOrNoticeElement key={event.id} event={event} />
      ))}
    </div>
  );
};

export default SecondScreen;
