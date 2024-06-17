package blood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import user.entity.BloodSugarsVer2;

import java.time.LocalDateTime;

public interface BloodRepository extends JpaRepository<BloodSugarsVer2,Long> {

    @Query("SELECT AVG(b.bloodSugarVer2) FROM BloodSugarsVer2 b WHERE b.dateTime >= :start AND b.dateTime <= :end")
    Double findAverageBloodSugarInPeriod(@Param("start")LocalDateTime start, @Param("end")LocalDateTime end);
}
