package blood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import user.entity.BloodSugarsVer2;

import java.time.LocalDateTime;

public interface BloodRepository extends JpaRepository<BloodSugarsVer2, Long> {

    @Query(value = "SELECT ROUND(SUM(blood_sugar_count)/15,2) FROM (" +
            "    SELECT COUNT(b.id) AS blood_sugar_count" +
            "    FROM user a" +
            "    JOIN blood_sugars_ver2 b ON a.id = b.emp_id" +
            "    WHERE b.date_time >= :start AND b.date_time <= :end" +
            "    GROUP BY a.id" +
            ") AS user_blood_sugar_counts", nativeQuery = true)
    Double findAverageBloodSugarCountInPeriod(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
