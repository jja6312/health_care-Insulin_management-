package point.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import user.entity.Point;

public interface PointRepository extends JpaRepository<Point, Long> {

}
