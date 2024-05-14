package user.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class Steps {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emp_id")//유저의 사원번호
    private User user;//유저

    private int stepsCount;// 걸음수

    private LocalDate date; // 날짜

    @Builder
    public Steps(User user, int stepsCount, LocalDate date) {
        this.user = user;
        this.stepsCount = stepsCount;
        this.date = date;
    }


}
