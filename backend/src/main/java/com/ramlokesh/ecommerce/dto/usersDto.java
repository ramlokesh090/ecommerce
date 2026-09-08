package com.ramlokesh.ecommerce.dto;


public class usersDto {
    private Long userId;
    private int statuscode;
    private String Message;

    public usersDto(Long userId, int statuscode, String message) {
        this.userId = userId;
        this.statuscode = statuscode;
        this.Message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public int getStatuscode() {
        return statuscode;
    }

    public String getMessage() {
        return Message;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setStatuscode(int statuscode) {
        this.statuscode = statuscode;
    }

    public void setMessage(String message) {
        this.Message = message;
    }
}
