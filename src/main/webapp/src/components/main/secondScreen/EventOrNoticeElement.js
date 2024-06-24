import React from "react";
import { useEventStore } from "../../../store/useEventStore";
import { markEventAsRead } from "../../../api/event/markEventAsRead";

const EventOrNoticeElement = ({ event }) => {
  const { readList, setSelectedEvent, setIsEventModalOpen } = useEventStore();

  const handleImageClick = async () => {
    setIsEventModalOpen(true);
    setSelectedEvent(event);
    try {
      const response = await markEventAsRead(event.id);
      console.log("markEventAsRead읽기", response.data);
    } catch (error) {
      console.error("이벤트 읽기 처리 중 에러 발생", error);
    }
  };

  return (
    <div
      className={`w-full px-[8.333%] py-5 flex justify-between items-start 
      ${
        readList.filter((read) => read.event_id === event.id).length > 0
          ? ""
          : "bg-green-100 dark:bg-gray-700"
      }`}
      onClick={handleImageClick}
    >
      <div className="w-14 h-full flex justify-center items-center">
        <span>{event.eventType === "EVENT" ? "📢" : "💌"}</span>
      </div>
      <div className="w-full ml-2">
        <div className="flex flex-col items-start">
          <span>{event.title}</span>
          <span className="text-xs text-gray-400">{event.content}</span>
        </div>
      </div>
      <div className="w-24 h-full flex justify-center items-center text-xs text-gray-400">
        <span>{event.createdAt.split("T")[0].split("2024-")[1]}</span>
      </div>
      {/* base64 이미지 불러오기 */}
      <img className="w-10 h-10" src={`${event.image}`} alt="event" />
    </div>
  );
};

export default EventOrNoticeElement;
