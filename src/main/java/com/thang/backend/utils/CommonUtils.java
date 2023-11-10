package com.thang.backend.utils;

import java.util.Base64;

import org.springframework.stereotype.Service;

@Service
public class CommonUtils {
    public byte[] imageToDatabase(String image) {
        byte[] avatar = new byte[0];
        if (!image.isEmpty()) {
            try {
                avatar = Base64.getDecoder().decode(image);
            } catch (IllegalArgumentException e) {
                // Handle the exception (e.g., log an error message)
                // You can also choose to return null or throw a custom exception here
                avatar = new byte[0]; // Set avatar as an empty byte array
            }
        }
        return avatar;
    }

    public String imageToFrontEnd(byte[] image) {
        String avatar = "";
        if (image != null) {
            avatar = Base64.getEncoder().encodeToString(image);
        }

        return avatar;
    }
}
