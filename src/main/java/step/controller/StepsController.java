package step.controller;

import event.dto.EventIdAsReadDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import step.service.StepsService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StepsController {
    private final StepsService stepsService;

    @GetMapping("/step/getConsecutiveGoalSteps")
    public ResponseEntity<Integer> countConsecutiveGoalSteps(@AuthenticationPrincipal UserDetails userDetails) {
        String empId = userDetails.getUsername();

        return ResponseEntity.ok(stepsService.countConsecutiveDaysExceedingGoalSteps(empId));
    }
}
