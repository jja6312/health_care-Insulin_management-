package event.repository;

import event.entity.Event;
import event.entity.EventType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event,Long> {

    List<Event> findByEventType(EventType eventType);
}
