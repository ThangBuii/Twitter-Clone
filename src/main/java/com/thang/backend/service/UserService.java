package com.thang.backend.service;

import com.thang.backend.dto.AuthenticationResponse;
import com.thang.backend.dto.User.AuthenticationRequest;
import com.thang.backend.dto.User.RegisterRequest;

public interface UserService {

    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(AuthenticationRequest request);
    
}
