package com.thang.backend.service.impl;

import java.util.Date;

import org.springframework.mail.MailException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.thang.backend.config.JwtService;
import com.thang.backend.dto.AuthenticationResponse;
import com.thang.backend.dto.User.AuthenticationRequest;
import com.thang.backend.dto.User.OtpRequest;
import com.thang.backend.dto.User.RegisterRequest;
import com.thang.backend.entity.Role;
import com.thang.backend.entity.User;
import com.thang.backend.exception.CustomException;
import com.thang.backend.repository.UserRepository;
import com.thang.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        User user = User.builder().email(request.getEmail()).username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER).dob(request.getDob()).registrationDate(new Date(System.currentTimeMillis())).build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    @Override
    public AuthenticationResponse login(AuthenticationRequest request) {
        String usernameOrEmail = request.getUsername();

        if(usernameOrEmail.contains("@")){
            var user = userRepository.findByEmail(usernameOrEmail).orElseThrow(() -> new UsernameNotFoundException("User not found"));
            usernameOrEmail = user.getUsername();
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(usernameOrEmail, request.getPassword()));
        var user = userRepository.findByUsername(usernameOrEmail).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    @Override
    public boolean checkUsernameExisted(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean checkEmailExisted(String value) {
        return userRepository.existsByEmail(value);
    }

    @Override
    public int sendOTP(OtpRequest info) {
        if (userRepository.existsByUsername(info.getUsername())) {
            throw new CustomException(400, "Username existed");
        }
        int otp = (int) ((Math.random() * 900_000) + 100_000);

        try {
            emailService.sendOtpEmail(info.getEmail(), String.valueOf(otp));
        } catch (MailException e) {
            // Handle the exception or log it
            e.printStackTrace(); // Example: Log the exception stack trace
        }
        return otp;
    }

}
