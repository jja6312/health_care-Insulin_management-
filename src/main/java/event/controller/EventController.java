package event.controller;

import event.dto.EventDTO;
import event.entity.Event;
import event.service.EventService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import security.JwtUtil;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class EventController {
    private final EventService eventService;
    private final JwtUtil jwtUtil;
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

    @PostMapping("/events/{eventId}/read")
    public ResponseEntity<Void> markEventAsRead(@AuthenticationPrincipal UserDetails userDetails, @PathVariable("eventId") Long eventId) {
        String empId = userDetails.getUsername();
        log.info("이벤트접근 empId={}",empId);
        eventService.markEventAsRead(empId, eventId);
        return ResponseEntity.ok().build();
    }

}
