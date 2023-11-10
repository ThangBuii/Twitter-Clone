package com.thang.backend.service;

import com.thang.backend.dto.AuthenticationResponse;
import com.thang.backend.dto.User.AuthenticationRequest;
import com.thang.backend.dto.User.CheckEmailRequest;
import com.thang.backend.dto.User.CheckEmailResponse;
import com.thang.backend.dto.User.OtpRequest;
import com.thang.backend.dto.User.RecommendUsernameRequest;
import com.thang.backend.dto.User.RecommendUsernameResponse;
import com.thang.backend.dto.User.RegisterRequest;
import com.thang.backend.dto.User.UserProfileResponse;


public interface UserService {

    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(AuthenticationRequest request);

    boolean checkUsernameExisted(String username);

    boolean checkEmailExisted(String value);

    int sendOTP(OtpRequest info);

    CheckEmailResponse checkAccountExists(CheckEmailRequest info);

    RecommendUsernameResponse generateUsernames(RecommendUsernameRequest info);

    UserProfileResponse getUserProfile(String username);
    
}
