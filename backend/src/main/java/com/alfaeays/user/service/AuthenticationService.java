package com.alfaeays.user.service;

import com.alfaeays.security.TokenService;
import com.alfaeays.shared.GlobalResponse;
import com.alfaeays.user.entity.User;
import com.alfaeays.user.mapper.UserMapper;
import com.alfaeays.user.model.AuthenticationRequest;
import com.alfaeays.user.model.AuthenticationResponse;
import com.alfaeays.user.model.RegistrationRequest;
import com.alfaeays.user.model.UserResponse;
import com.alfaeays.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static java.lang.String.format;
import static com.alfaeays.user.util.UserConstants.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public GlobalResponse<UserResponse> register(RegistrationRequest request) {

        User user = UserMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreatedOn(new Date());
        user.setCreatedBy(user.getEmail());

        var savedUser = userRepository.save(user);

        return GlobalResponse.success(
                format(USER_SAVED_SUCCESS, request.getEmail()),
                UserMapper.toResponse(savedUser)
        );
    }

    public GlobalResponse<AuthenticationResponse> authenticate(AuthenticationRequest request) {
        try {
            var auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            Map<String, Object> claims = new HashMap<>();
            User user = (User) auth.getPrincipal();
            claims.put("name", user.fullName());
            claims.put("email", user.getEmail());
            claims.put("authorities", user.getAuthorities());

            var token = tokenService.generateToken(claims, user);

            //update user login date and status
            user.setLastLoginOn(new Date());
            user.setOnline(true);
            userRepository.save(user);

            return GlobalResponse.success(
                    AuthenticationResponse
                            .builder()
                            .email(user.getUsername())
                            .email(user.getEmail())
                            .token(token)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage().toUpperCase());
        }
    }

        public GlobalResponse<Void> logout(User principal) {
            principal.setLogoutOn(new Date());
            userRepository.save(principal);
            return GlobalResponse.success();
        }

}
