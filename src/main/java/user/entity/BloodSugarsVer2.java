package user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class BloodSugarsVer2 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int bloodSugarVer2;// 혈당

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="emp_id")
    private User user;

    private LocalDateTime dateTime;


}
