package point.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import point.repository.PointRepository;
import user.entity.Point;
import user.entity.User;
import user.repository.UserRepository;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class PointService {
    private final PointRepository pointRepository;
    private final UserRepository userRepository;

    @Transactional
    public Point addPoint(User user, int pointsEarned, LocalDate date) {
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
}
