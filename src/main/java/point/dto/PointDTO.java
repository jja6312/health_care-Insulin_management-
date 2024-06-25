package point.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PointDTO {
    private String empId;
    private int pointsEarned;
    private LocalDate date;
}
