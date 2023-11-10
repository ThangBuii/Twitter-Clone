package com.thang.backend.model.mapper;

import org.springframework.stereotype.Service;

import com.thang.backend.dto.User.UserProfileResponse;
import com.thang.backend.entity.User;
import com.thang.backend.utils.CommonUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserMapper {

    private final CommonUtils commonUtils;

    public UserProfileResponse toUserProfile(User user) {
        return UserProfileResponse.builder().userID(user.getUserID()).username(user.getUsername())
                .email(user.getEmail()).displayName(user.getDisplayName())
                .registrationDate(user.getRegistrationDate()).dob(user.getDob())
                .profilePic(commonUtils.imageToFrontEnd( user.getProfilePic())).role(user.getRole().toString()).build();
    }
    
}
