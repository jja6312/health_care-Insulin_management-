package blood.service;

import blood.repository.BloodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BloodService {
    private final BloodRepository bloodRepository;

    public Double getAverageBloodSugarInPeriod(LocalDateTime start, LocalDateTime end) {

        return bloodRepository.findAverageBloodSugarInPeriod(start,end);
    }
}
