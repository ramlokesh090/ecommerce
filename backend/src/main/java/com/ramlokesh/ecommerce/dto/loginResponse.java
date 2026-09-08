package com.ramlokesh.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class loginResponse {
    private Long userId;
    private String role;
    private String message;
    private int statusCode;
    private String name;
    private String token;

}
