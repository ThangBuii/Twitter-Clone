package com.thang.backend.dto.User;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {
    private int userID;
    private String username;
    private String email;
    private String displayName;
    private Date registrationDate;
    private Date dob;
    private String profilePic;
    private String role;
}
