package event.service;

import event.dto.EventDTO;
import event.dto.EventIdAsReadDTO;
import event.dto.NoticeDTO;
import event.entity.Event;
import event.entity.EventType;
import event.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import user.entity.User;
import user.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public Event createEvent(EventDTO eventDTO) {
        Event event = Event.builder()
                .title(eventDTO.getTitle())
                .content(eventDTO.getContent())
                .image(eventDTO.getImage())
                .eventType(EventType.EVENT)
                .build();
        return eventRepository.save(event);
    }

    public Event createNotice(NoticeDTO noticeDTO) {
        Event event = Event.builder()
                .title(noticeDTO.getTitle())
                .content(noticeDTO.getContent())
                .image(noticeDTO.getImage())
                .hyperlink(noticeDTO.getHyperlink())
                .eventType(EventType.NOTICE)
                .empId(noticeDTO.getEmpId())
                .weeklyImage(noticeDTO.getWeeklyImage())
                .build();
        return eventRepository.save(event);
    }

    public List<Event> getEvents() {
        return eventRepository.findByEventType(EventType.EVENT);
    }

    public List<Event> getNotices(String empId) {
        return eventRepository.findByEventTypeAndEmpId(EventType.NOTICE, empId);
    }

    public void markEventAsRead(String empId, Long eventId) {
        User user = userRepository.findByEmpId(empId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없음"));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("이벤트를 찾을 수 없음"));

        event.markAsRead(user.getEmpId());
        eventRepository.save(event);
    }

    public List<EventIdAsReadDTO> getEventReadList(String empId) {
        return eventRepository.findAll().stream()
                .filter(event -> event.getReadByUsers().contains(empId))
                .map(event -> new EventIdAsReadDTO(event.getId()))
                .collect(Collectors.toList());
    }


}
