package com.thang.backend.exception;

public class NotFoundException extends CustomException{

    public NotFoundException(int errorCode, String errorMessage, Throwable cause) {
        super(errorCode, errorMessage + " not found", cause);
        //TODO Auto-generated constructor stub
    }

    public NotFoundException(int errorCode, String errorMessage) {
        super(errorCode, errorMessage + " not found");
        //TODO Auto-generated constructor stub
    }
    
}
