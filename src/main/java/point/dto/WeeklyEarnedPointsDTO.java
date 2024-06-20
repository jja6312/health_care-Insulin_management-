package point.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class WeeklyEarnedPointsDTO {
    private int week;
    private int point;
    private LocalDate startPeriod;
    private LocalDate endPeriod;
}
