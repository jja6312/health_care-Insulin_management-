package user.entity;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String empId; // 사원번호
    private String password; // 패스워드
    private LocalDateTime createdAt; // 가입일
    private int totalPoints; //누적 포인트
    private int stepGoal;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Steps> steps; //걸음수 목록

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Point> points; //포인트목록

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BloodSugars> bloodSugars; //걸음수 목록

    @Builder
    public User(String empId, String password) {
        this.empId = empId;
        this.password = password;
    }
}
