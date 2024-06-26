package point.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import point.dto.WeeklyEarnedPointsDTO;
import point.repository.PointRepository;
import user.entity.Point;
import user.entity.User;
import user.repository.UserRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PointService {
    private final PointRepository pointRepository;
    private final UserRepository userRepository;

    @Transactional
    public Point addPoint(User user, double pointsEarned, LocalDate date) {
        Point point = Point.builder()
                .user(user)
                .pointsEarned(pointsEarned)
                .date(date)
                .build();
        Point savedPoint = pointRepository.save(point);
        user.updateTotalPoints();
        userRepository.save(user);

        return savedPoint;
    }

    public List<WeeklyEarnedPointsDTO> getWeeklyEarnedPoints(LocalDate startDate, String empId) {
        User user = userRepository.findByEmpId(empId)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 ID"));

        List<Point> points = pointRepository.findByUser(user);
        List<WeeklyEarnedPointsDTO> weeklyPoints = new ArrayList<>();

        for (int week = 0; week < 12; week++) {
            LocalDate weekStartDate = startDate.plusWeeks(week);
            LocalDate weekEndDate = weekStartDate.plusWeeks(1);

            double weekPoints = points.stream()
                    .filter(p -> !p.getDate().isBefore(weekStartDate) && p.getDate().isBefore(weekEndDate))
                    .mapToDouble(Point::getPointsEarned)
                    .sum();

            WeeklyEarnedPointsDTO weeklyEarnedPointsDTO = new WeeklyEarnedPointsDTO();
            weeklyEarnedPointsDTO.setWeek(week + 1);
            weeklyEarnedPointsDTO.setPoint(weekPoints);
            weeklyEarnedPointsDTO.setStartPeriod(weekStartDate);
            weeklyEarnedPointsDTO.setEndPeriod(weekEndDate.minusDays(1)); // endPeriod는 주의 마지막 날을 의미
            weeklyPoints.add(weeklyEarnedPointsDTO);
        }

        return weeklyPoints;
    }
}
