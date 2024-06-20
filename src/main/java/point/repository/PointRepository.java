package point.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import user.entity.Point;
import user.entity.User;

import java.util.List;

public interface PointRepository extends JpaRepository<Point, Long> {

    List<Point> findByUser(User user);

}
