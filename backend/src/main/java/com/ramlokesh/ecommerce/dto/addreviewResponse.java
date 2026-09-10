package com.ramlokesh.ecommerce.dto;


import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class addreviewResponse {
    private Long reviewid;
    private int statuscode;
    private String message;
}
