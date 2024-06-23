package event.controller;

import event.dto.EventDTO;
import event.entity.Event;
import event.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping("/createEvent")
    public ResponseEntity<Event> createEvent(@RequestBody EventDTO eventDTO){
        Event event = eventService.createEvent(eventDTO);
        return ResponseEntity.ok(event);
    }

    @GetMapping("/getEvents")
    public List<Event> getEvents(){
        return eventService.getEvents();
    }

    @GetMapping("/getNotices")
    public List<Event> getNotices(){
        return eventService.getNotices();
    }

}
