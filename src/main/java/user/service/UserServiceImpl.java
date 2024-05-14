package user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import security.JwtUtil;
import user.dto.LoginDTO;
import user.entity.User;
import user.repository.UserRepository;

import java.util.Optional;

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
}
