import React, { useEffect, useRef } from "react";
import { useEventStore } from "../../../../store/useEventStore";

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
    <div className="fixed w-full h-full inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
      {/* 이미지 모달 */}
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-dark dark:text-white h-min-[60vh] w-11/12 max-w-2xl p-4 overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <span className="text-xl mb-2">{selectedEvent.title}</span>
          {selectedEvent.eventType === "EVENT" && (
            <img
              className="w-full mb-2 border-gray-300 border-4"
              src={`${selectedEvent.image}`}
              alt="event"
            />
          )}
          <span className="text-gray-500">{selectedEvent.content}</span>
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
