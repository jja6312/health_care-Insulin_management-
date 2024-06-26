import React, { useEffect } from "react";
import { getEvents } from "../../../api/event/getEvents";
import { getNotices } from "../../../api/event/getNotices";
import { getReadListByEmpId } from "../../../api/event/getReadListByEmpId";
import EventOrNoticeElement from "./EventOrNoticeElement";
import { useEventStore } from "../../../store/useEventStore";

const SecondScreen = ({ showSecondScreen }) => {
  const {
    selectedEvent,
    setReadList,
    eventList,
    setEventList,
    noticeList,
    setNoticeList,
  } = useEventStore();

  useEffect(() => {
    const fetchEventsAndNotices = async () => {
      try {
        const eventListData = await getEvents();
        const noticeListData = await getNotices();
        const readListData = await getReadListByEmpId();
        setEventList(eventListData);
        setNoticeList(noticeListData);
        setReadList(readListData);

        console.log("eventList", eventListData);
        console.log("noticeList", noticeListData);
        console.log("readList", readListData);
      } catch (error) {
        console.error("Error fetching events and notices:", error);
      }
    };

    fetchEventsAndNotices();
  }, [selectedEvent]);

  // eventList와 noticeList를 합치고 createdAt 기준으로 정렬
  const sortedEventsAndNotices = [...eventList, ...noticeList].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="flex flex-col justify-center items-center dark:text-white">
      <div className="py-4">
        <span className="text-[27px] text-nhgreen font-extrabold">
          알림/공지사항
        </span>
      </div>
      {showSecondScreen && (
        <div className="w-full h-full">
          {sortedEventsAndNotices.map((item) => (
            <EventOrNoticeElement key={item.id} event={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SecondScreen;
