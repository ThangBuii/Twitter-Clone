package com.thang.backend.service;

import com.thang.backend.dto.AuthenticationResponse;
import com.thang.backend.dto.User.AuthenticationRequest;
import com.thang.backend.dto.User.OtpRequest;
import com.thang.backend.dto.User.RegisterRequest;

import jakarta.mail.MessagingException;

public interface UserService {

    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(AuthenticationRequest request);

    boolean checkUsernameExisted(String username);

    boolean checkEmailExisted(String value);

    int sendOTP(OtpRequest info);
    
}
