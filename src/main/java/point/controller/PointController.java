package point.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import point.dto.PointDTO;
import point.service.PointService;
import user.entity.Point;
import user.entity.User;
import user.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
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

}
