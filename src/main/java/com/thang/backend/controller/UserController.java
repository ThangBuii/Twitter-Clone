package com.thang.backend.controller;

import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thang.backend.dto.AuthenticationResponse;
import com.thang.backend.dto.User.AuthenticationRequest;
import com.thang.backend.dto.User.OtpRequest;
import com.thang.backend.dto.User.RegisterRequest;
import com.thang.backend.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    
    //add validation

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request, HttpServletResponse response){
        var token = userService.register(request);
        Cookie jwtCookie = new Cookie("JWT-TOKEN",token.getToken());
        jwtCookie.setHttpOnly(true);

        response.addCookie(jwtCookie);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(userService.login(request));
    }

    @PostMapping("/user/checkUsername")
    public ResponseEntity<Boolean> checkUsername(@RequestParam String value){
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
    public ResponseEntity<Integer> sendOtpToEmail(@RequestBody OtpRequest info){
        int otp = userService.sendOTP(info);
        return ResponseEntity.ok(otp);
    }
}
