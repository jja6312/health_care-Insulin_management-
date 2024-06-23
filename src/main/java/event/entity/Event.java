package event.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;


    @Enumerated(EnumType.STRING)
    private EventType eventType;

    @Lob
    @Column(columnDefinition = "MEDIUMTEXT")
    private String image;


    @ElementCollection
    @CollectionTable(name = "event_read_users", joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "emp_id")
    private Set<String> readByUsers = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
    public void markAsRead(String empId) {
        readByUsers.add(empId);
    }
}
