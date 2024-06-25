package step.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import user.entity.Steps;

import java.util.List;

@Repository
public interface StepsRepository extends JpaRepository<Steps, Long> {
    List<Steps> findByUserEmpIdOrderByDateDesc(String empId);
}
