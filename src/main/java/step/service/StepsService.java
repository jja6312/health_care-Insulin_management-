package step.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import step.repository.StepsRepository;
import user.entity.Steps;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StepsService {
    private final StepsRepository stepsRepository;

    public int countConsecutiveDaysExceedingGoalSteps(String empId) {
        List<Steps> steps = stepsRepository.findByUserEmpIdOrderByDateDesc(empId);

        if (steps.isEmpty()) {
            log.info("걸음수: 가장 최근 데이터가 없음");
            return 0;
        }

        int goalSteps = steps.get(0).getUser().getStepGoal();
        int consecutiveDays = 0;

        for (Steps step : steps) {
            if (step.getStepsCount() >= goalSteps) {
                consecutiveDays++;
            } else {
                break;
            }
        }

        log.info("연속걸음수={}", consecutiveDays);
        return consecutiveDays;
    }
}
