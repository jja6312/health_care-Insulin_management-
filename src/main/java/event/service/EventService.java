package event.service;

import event.dto.EventDTO;
import event.entity.Event;
import event.entity.EventType;
import event.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import user.entity.User;
import user.repository.UserRepository;

import java.util.List;

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

    public List<Event> getEvents() {
        return eventRepository.findByEventType(EventType.EVENT);
    }

    public List<Event> getNotices() {
        return eventRepository.findByEventType(EventType.NOTICE);
    }

    public void markEventAsRead(Long userId, Long eventId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없음"));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("이벤트를 찾을 수 없음"));

        String empId = user.getEmpId();
        event.markAsRead(empId);
        eventRepository.save(event);
    }
}
