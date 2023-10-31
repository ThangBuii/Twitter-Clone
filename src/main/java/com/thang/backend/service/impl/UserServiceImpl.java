package com.thang.backend.service.impl;

import java.util.Date;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.thang.backend.config.JwtService;
import com.thang.backend.dto.AuthenticationResponse;
import com.thang.backend.dto.User.AuthenticationRequest;
import com.thang.backend.dto.User.RegisterRequest;
import com.thang.backend.entity.Role;
import com.thang.backend.entity.User;
import com.thang.backend.repository.UserRepository;
import com.thang.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // public void setJwtTokenInCookie(String jwtToken) {
    //     Cookie cookie = new Cookie("JWT-TOKEN", jwtToken);
    //     cookie.setPath("/");
    //     cookie.setHttpOnly(true);
    //     // You can also set other cookie attributes like domain, secure, and max-age if needed.
    //     response.addCookie(cookie);
    // }
    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        User user = User.builder().email(request.getEmail()).username(request.getUsername())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .role(Role.USER).dob(request.getDob()).registrationDate(new Date(System.currentTimeMillis()) ).build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    @Override
    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        var user  = userRepository.findByUsername(request.getUsername())
                    .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
    
}
