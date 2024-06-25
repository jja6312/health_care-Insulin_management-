package point.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import point.dto.PeriodDTO;
import point.dto.PointDTO;
import point.dto.WeeklyEarnedPointsDTO;
import point.service.PointService;
import user.entity.Point;
import user.entity.User;
import user.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class PointController {
    private final PointService pointService;
    private final UserRepository userRepository;


    @PostMapping("/addPoints")
    public ResponseEntity<Point> addPoint(@RequestBody PointDTO pointDTO){
        User user = userRepository.findByEmpId(pointDTO.getEmpId())
                .orElseThrow(()-> new IllegalArgumentException("유효하지 않은 ID"));
        Point point = pointService.addPoint(user, pointDTO.getPointsEarned(), pointDTO.getDate());

        return new ResponseEntity<>(point, HttpStatus.CREATED);
    }

    @GetMapping("/getWeeklyEarnedPoints")
    public List<WeeklyEarnedPointsDTO> getWeeklyEarnedPoints(@RequestParam("startDate") LocalDate startDate, Authentication authentication){
        String empId = getEmpIdFromToken(authentication);
        log.info("startDate = {}, empId={}",startDate,empId);

        return pointService.getWeeklyEarnedPoints(startDate,empId);
    }

    private String getEmpIdFromToken(Authentication authentication) {
        if(authentication == null || !authentication.isAuthenticated()){
            throw new IllegalArgumentException("인증되지 않은 사용자입니다.");

        }
        return authentication.getName();
    }

}
