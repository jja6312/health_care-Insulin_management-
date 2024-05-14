package user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import user.entity.User;
import user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String empId) throws UsernameNotFoundException {
        User user = userRepository.findByEmpId(empId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with empId: " + empId));
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmpId())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }
}
