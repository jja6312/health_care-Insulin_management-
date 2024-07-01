import React, { useEffect, useRef } from "react";
import { useEventStore } from "../../../../store/useEventStore";
import WeeklyImage from "../WeeklyImage";
import A2 from "../weeklyImages/A/A2";
import A3 from "../weeklyImages/A/A3";
import A4 from "../weeklyImages/A/A4";
import A5 from "../weeklyImages/A/A5";
import A6 from "../weeklyImages/A/A6";
import A7 from "../weeklyImages/A/A7";
import A8 from "../weeklyImages/A/A8";

import B2 from "../weeklyImages/B/B2";
import B3 from "../weeklyImages/B/B3";
import B4 from "../weeklyImages/B/B4";
import B5 from "../weeklyImages/B/B5";
import B6 from "../weeklyImages/B/B6";
import B7 from "../weeklyImages/B/B7";
import B8 from "../weeklyImages/B/B8";

import C2 from "../weeklyImages/C/C2";
import C3 from "../weeklyImages/C/C3";
import C4 from "../weeklyImages/C/C4";
import C5 from "../weeklyImages/C/C5";
import C6 from "../weeklyImages/C/C6";
import C7 from "../weeklyImages/C/C7";
import C8 from "../weeklyImages/C/C8";

import D2 from "../weeklyImages/D/D2";
import D3 from "../weeklyImages/D/D3";
import D4 from "../weeklyImages/D/D4";
import D5 from "../weeklyImages/D/D5";
import D6 from "../weeklyImages/D/D6";
import D7 from "../weeklyImages/D/D7";
import D8 from "../weeklyImages/D/D8";

const EventModal = () => {
  const { selectedEvent, isEventModalOpen, setIsEventModalOpen } =
    useEventStore();
  const modalRef = useRef(null);

  const handleClose = () => {
    setIsEventModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isEventModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isEventModalOpen]);

  return (
    <div className="fixed w-full h-full inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-80">
      {/* 이미지 모달 */}
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-dark dark:text-white h-min-[60vh] w-11/12 max-w-2xl p-4 overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          {/* NOTICE, 이미지가 없을때만 title을 띄운다. */}
          {selectedEvent.eventType === "NOTICE" &&
            selectedEvent.image === null && (
              <span className="text-xl mb-2">{selectedEvent.title}</span>
            )}
          {/* EVENT 공지사항이라면, 이미지를 띄운다. */}
          {selectedEvent.eventType === "EVENT" &&
          selectedEvent.weeklyImage === null ? (
            <img
              className="w-full mb-2 border-gray-300 border-4"
              src={`${selectedEvent.image}`}
              alt="event"
            />
          ) : selectedEvent.weeklyImage === "1회차" ? (
            <WeeklyImage />
          ) : (
            <a
              href={selectedEvent.hyperlink}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedEvent.hyperlink}
            </a>
          )}

          {/* NOTICE, 이미지가 없을때만 내용을 띄운다. */}
          {selectedEvent.eventType === "NOTICE" &&
            selectedEvent.image === null && (
              <span className="text-gray-500">{selectedEvent.content}</span>
            )}

          {/* NOTICE, 이미지가 있다면*/}
          {selectedEvent.weeklyImage === "A2" ? (
            <A2 />
          ) : selectedEvent.weeklyImage === "A3" ? (
            <A3 />
          ) : selectedEvent.weeklyImage === "A4" ? (
            <A4 />
          ) : selectedEvent.weeklyImage === "A5" ? (
            <A5 />
          ) : selectedEvent.weeklyImage === "A6" ? (
            <A6 />
          ) : selectedEvent.weeklyImage === "A7" ? (
            <A7 />
          ) : selectedEvent.weeklyImage === "A8" ? (
            <A8 />
          ) : selectedEvent.weeklyImage === "B2" ? (
            <B2 />
          ) : selectedEvent.weeklyImage === "B3" ? (
            <B3 />
          ) : selectedEvent.weeklyImage === "B4" ? (
            <B4 />
          ) : selectedEvent.weeklyImage === "B5" ? (
            <B5 />
          ) : selectedEvent.weeklyImage === "B6" ? (
            <B6 />
          ) : selectedEvent.weeklyImage === "B7" ? (
            <B7 />
          ) : selectedEvent.weeklyImage === "B8" ? (
            <B8 />
          ) : selectedEvent.weeklyImage === "C2" ? (
            <C2 />
          ) : selectedEvent.weeklyImage === "C3" ? (
            <C3 />
          ) : selectedEvent.weeklyImage === "C4" ? (
            <C4 />
          ) : selectedEvent.weeklyImage === "C5" ? (
            <C5 />
          ) : selectedEvent.weeklyImage === "C6" ? (
            <C6 />
          ) : selectedEvent.weeklyImage === "C7" ? (
            <C7 />
          ) : selectedEvent.weeklyImage === "C8" ? (
            <C8 />
          ) : selectedEvent.weeklyImage === "D2" ? (
            <D2 />
          ) : selectedEvent.weeklyImage === "D3" ? (
            <D3 />
          ) : selectedEvent.weeklyImage === "D4" ? (
            <D4 />
          ) : selectedEvent.weeklyImage === "D5" ? (
            <D5 />
          ) : selectedEvent.weeklyImage === "D6" ? (
            <D6 />
          ) : selectedEvent.weeklyImage === "D7" ? (
            <D7 />
          ) : selectedEvent.weeklyImage === "D8" ? (
            <D8 />
          ) : (
            ""
          )}

          {/* EVENT, 이미지가 없을때만 내용을 띄운다. */}
        </div>
      </div>
      <div className="w-full flex justify-end mr-8">
        <button
          className="bg-red-500 text-white px-2 py-1 w-20 rounded"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventModal;
