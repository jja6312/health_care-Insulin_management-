package user.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
//@EntityListeners(PointListener.class)
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="emp_id") // 유저의 사원 번호
    private User user;

    private int pointsEarned; // 얻은 포인트
    private LocalDate date; // 날짜

    @Builder
    public Point(User user, int pointsEarned, LocalDate date){
        this.user = user;
        this.pointsEarned = pointsEarned;
        this.date=date;
    }

}
