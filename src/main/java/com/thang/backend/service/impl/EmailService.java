package com.thang.backend.service.impl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;

    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("thangbdhe170642@fpt.edu.vn");
        message.setTo(toEmail);
        message.setSubject("Your OTP Code from Twitter Clone");
        message.setText("Your OTP code is: " + otp);

        javaMailSender.send(message);
    }
}
