package user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import user.entity.Steps;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserInfoDTO {
    private String empId;
    private double totalPoints;
    private int stepGoal;
    private LocalDate createdAt;
    private List<StepDTO> steps;
    private List<BloodSugarDTO> bloodSugars;
    private List<BloodSugarVer2DTO> bloodSugarsVer2;

    @Getter
    @Setter
    @Builder
    public static class StepDTO {
        private int stepsCount;
        private LocalDate date;
    }

    @Getter
    @Setter
    @Builder
    public static class BloodSugarDTO {
        private int bloodSugar;
        private LocalDateTime dateTime;
    }

    @Getter
    @Setter
    @Builder
    public static class BloodSugarVer2DTO {
        private int bloodSugarVer2;
        private LocalDateTime dateTime;
    }
}
