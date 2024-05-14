package user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import user.dto.LoginDTO;
import user.dto.TokenDTO;
import user.entity.User;
import user.service.UserService;
import security.JwtUtil;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody LoginDTO loginDTO) {
        Optional<User> userOptional = userService.login(loginDTO);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(loginDTO.getPassword())) {  // 비밀번호 검증
                String accessToken = jwtUtil.generateAccessToken(user);
                String refreshToken = jwtUtil.generateRefreshToken(user);
                return ResponseEntity.ok(new TokenDTO(accessToken, refreshToken));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new TokenDTO("비밀번호가 유효하지 않습니다."));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new TokenDTO("사번 또는 비밀번호가 유효하지 않습니다."));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenDTO> refresh(@RequestBody TokenDTO tokenDTO) {
        String refreshToken = tokenDTO.getRefreshToken();
        if (jwtUtil.validateToken(refreshToken)) {
            String empId = jwtUtil.extractUsername(refreshToken);
            Optional<User> userOptional = userService.findByEmpId(empId);
            if (userOptional.isPresent()) {
                String accessToken = jwtUtil.generateAccessToken(userOptional.get());
                return ResponseEntity.ok(new TokenDTO(accessToken, refreshToken));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new TokenDTO("사용자를 찾을 수 없습니다."));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new TokenDTO("리프레시 토큰이 유효하지 않습니다."));
        }
    }
}
