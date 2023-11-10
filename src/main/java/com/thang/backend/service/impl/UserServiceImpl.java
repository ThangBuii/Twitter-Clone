package com.thang.backend.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.mail.MailException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.thang.backend.config.JwtService;
import com.thang.backend.dto.AuthenticationResponse;
import com.thang.backend.dto.User.AuthenticationRequest;
import com.thang.backend.dto.User.CheckEmailRequest;
import com.thang.backend.dto.User.CheckEmailResponse;
import com.thang.backend.dto.User.OtpRequest;
import com.thang.backend.dto.User.RecommendUsernameRequest;
import com.thang.backend.dto.User.RecommendUsernameResponse;
import com.thang.backend.dto.User.RegisterRequest;
import com.thang.backend.dto.User.UserProfileResponse;
import com.thang.backend.entity.Role;
import com.thang.backend.entity.User;
import com.thang.backend.model.mapper.UserMapper;
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
    private final UserMapper userMapper;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        User user = User.builder().email(request.getEmail()).username(request.getUsername())
                .displayName(request.getDisplayName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER).dob(request.getDob()).registrationDate(new Date(System.currentTimeMillis())).build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    @Override
    public AuthenticationResponse login(AuthenticationRequest request) {
        String usernameOrEmail = request.getUsername();

        if (usernameOrEmail.contains("@")) {
            var user = userRepository.findByEmail(usernameOrEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            usernameOrEmail = user.getUsername();
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(usernameOrEmail, request.getPassword()));
        var user = userRepository.findByUsername(usernameOrEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

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
        int otp = (int) ((Math.random() * 900_000) + 100_000);

        try {
            emailService.sendOtpEmail(info.getEmail(), String.valueOf(otp));
        } catch (MailException e) {
            // Handle the exception or log it
            e.printStackTrace(); // Example: Log the exception stack trace
        }
        return otp;
    }

    @Override
    public CheckEmailResponse checkAccountExists(CheckEmailRequest info) {
        CheckEmailResponse response = new CheckEmailResponse();
        response.setEmailExist(userRepository.existsByEmail(info.getEmail()));
        return response;
    }

    @Override
    public RecommendUsernameResponse generateUsernames(RecommendUsernameRequest info) {
        String name = info.getName();
        String dob = info.getDob();

        List<String> usernames = new ArrayList<>();

        String firstLetter = name.substring(0, 1);
        String year = dob.substring(0, 4);
        String month = dob.substring(5, 7);
        String day = dob.substring(8, 10);

        int counter = 0;
        String patterns[] = { firstLetter + year, firstLetter + month + day, name + year, name + month + day };
        while (true) {
            for (int i = 0; i < 4; i++) {
                String username = "";
                if(counter == 0){
                    username = patterns[i];
                }else{
                    username = patterns[i] + counter;
                }
                if (!userRepository.existsByUsername(username) && usernames.size()<6) {
                    usernames.add(username);
                }else{
                    break;
                }
            }
            if(usernames.size()>=6){
                break;
            }
            counter++;
        }

        return RecommendUsernameResponse.builder().generatedUsernames(usernames).build();
    }

    @Override
    public UserProfileResponse getUserProfile(String username) {
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return userMapper.toUserProfile(user);
    }

}
