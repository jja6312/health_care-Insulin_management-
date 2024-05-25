package user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import security.JwtUtil;
import user.dto.LoginDTO;
import user.dto.UserInfoDTO;
import user.entity.User;
import user.repository.UserRepository;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Override
    public Optional<User> login(LoginDTO loginDTO) {
        return userRepository.findByEmpId(loginDTO.getEmpId())
                .filter(user -> user.getPassword().equals(loginDTO.getPassword()));
    }

    @Override
    public String generateAccessToken(User user) {
        return jwtUtil.generateAccessToken(user);
    }

    @Override
    public String generateRefreshToken(User user) {
        return jwtUtil.generateRefreshToken(user);
    }

    @Override
    public Optional<User> findByEmpId(String empId) {
        return userRepository.findByEmpId(empId);
    }

    @Override
    public UserInfoDTO getUserInfo(String empId) {
        User user = userRepository.findByEmpId(empId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없음"));

        return UserInfoDTO.builder() //UserInfoDTO를 Return.
                .empId(user.getEmpId())//사번
                .totalPoints(user.getTotalPoints())//총 포인트
                .steps(user.getSteps().stream()//걸음수
                        .map(step -> UserInfoDTO.StepDTO.builder()
                                .stepsCount(step.getStepsCount())
                                .date(step.getDate())
                                .build())
                        .collect(Collectors.toList()))//걸음수는 List로 묶어서 반환
                .build();
    }
}
