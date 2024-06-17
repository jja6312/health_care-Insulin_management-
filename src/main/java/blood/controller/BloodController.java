package blood.controller;

import blood.service.BloodService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BloodController {
    private final BloodService bloodService;

    @GetMapping("/blood/count/avg")
    public Double getAverageBloodSugarInPeriod(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return bloodService.getAverageBloodSugarInPeriod(start, end);
    }
}
