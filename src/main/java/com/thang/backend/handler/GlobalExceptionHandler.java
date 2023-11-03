package com.thang.backend.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.thang.backend.dto.Message;
import com.thang.backend.exception.CustomException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<?> handleException(Exception exception) {
        return ResponseEntity.badRequest().body(Message.builder().message(exception.getMessage()).build());
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleCustomException(CustomException exception) {
        int errorCode = exception.getErrorCode();
        String errorMessage = exception.getMessage();
        return ResponseEntity.status(errorCode).body(Message.builder().message(errorMessage).build());
    }
}
