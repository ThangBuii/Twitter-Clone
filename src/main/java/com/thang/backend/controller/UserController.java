package com.thang.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.WebUtils;

import com.thang.backend.config.JwtService;
import com.thang.backend.dto.Message;
import com.thang.backend.dto.User.AuthenticationRequest;
import com.thang.backend.dto.User.CheckEmailRequest;
import com.thang.backend.dto.User.CheckEmailResponse;
import com.thang.backend.dto.User.OtpRequest;
import com.thang.backend.dto.User.RecommendUsernameRequest;
import com.thang.backend.dto.User.RecommendUsernameResponse;
import com.thang.backend.dto.User.RegisterRequest;
import com.thang.backend.dto.User.UserProfileResponse;
import com.thang.backend.exception.CustomException;
import com.thang.backend.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    // add validation

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request, HttpServletResponse response) {
        try {
            var token = userService.register(request);

            Cookie jwtCookie = new Cookie("JWT_TOKEN", token.getToken());
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(true); // In production, use HTTPS

            response.addCookie(jwtCookie);

            // Return a 201 Created response for successful registration
            return ResponseEntity.status(HttpStatus.CREATED).body(Message.builder().message("Account created").build());
        } catch (Exception ex) {
            // Handle registration failure and return an appropriate response
            throw new CustomException(404, "Server error");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Message> login(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        try {
            var token = userService.login(request);

            Cookie jwtCookie = new Cookie("JWT_TOKEN", token.getToken());
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(true); // In production, use HTTPS

            response.addCookie(jwtCookie);

            // Return a 201 Created response for successful registration
            return ResponseEntity.ok(Message.builder().message("Login successful").build());
        } catch (Exception ex) {
            // Handle registration failure and return an appropriate response
            throw new CustomException(401, "Wrong password");
        }
    }

    @GetMapping("/user/checkUsername")
    public ResponseEntity<Boolean> checkUsername(@RequestParam String value) {
        if (value.contains("@")) {
            // Input contains "@" symbol, treat it as an email
            boolean emailExists = userService.checkEmailExisted(value);
            return ResponseEntity.ok(emailExists);
        } else {
            // Input does not contain "@" symbol, treat it as a username
            boolean usernameExists = userService.checkUsernameExisted(value);
            return ResponseEntity.ok(usernameExists);
        }
    }

    @PostMapping("/user/otp")
    public ResponseEntity<Integer> sendOtpToEmail(@RequestBody OtpRequest info) {
        int otp = userService.sendOTP(info);
        return ResponseEntity.ok(otp);
    }

    @PostMapping("user/checkAccountExists")
    public ResponseEntity<CheckEmailResponse> checkAccountExists(@RequestBody CheckEmailRequest info) {
        CheckEmailResponse res = userService.checkAccountExists(info);
        return ResponseEntity.ok(res);
    }

    @PostMapping("user/generateUsername")
    public ResponseEntity<RecommendUsernameResponse> generateRecommendUsername(
            @RequestBody RecommendUsernameRequest info) {
        RecommendUsernameResponse res = userService.generateUsernames(info);
        return ResponseEntity.ok(res);
    }

    @GetMapping("user/user-profile")
    public ResponseEntity<UserProfileResponse> getUserProfile(HttpServletRequest req) {
        Cookie cookie = WebUtils.getCookie(req, "JWT_TOKEN");

        String token = cookie.getValue();
        String username = jwtService.extractUsername(token);
        UserProfileResponse res = userService.getUserProfile(username);

        return ResponseEntity.ok(res);
    }
}
