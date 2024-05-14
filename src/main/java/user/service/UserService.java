package user.service;

import user.dto.LoginDTO;
import user.entity.User;

import java.util.Optional;

public interface UserService {
    Optional<User> login(LoginDTO loginDTO);
    String generateAccessToken(User user);
    String generateRefreshToken(User user);
    Optional<User> findByEmpId(String empId);
}
