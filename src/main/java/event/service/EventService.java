package event.service;

import event.dto.EventDTO;
import event.entity.Event;
import event.entity.EventType;
import event.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;

    public Event createEvent(EventDTO eventDTO) {
        Event event = Event.builder()
                .title(eventDTO.getTitle())
                .content(eventDTO.getContent())
                .image(eventDTO.getImage())
                .eventType(EventType.EVENT)
                .build();
        return eventRepository.save(event);
    }
}
