package com.ramlokesh.ecommerce.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetreviewResponse {
    private Long reviewCreatedBy;
    private String reviewerName;
    private String reviewerEmail;
    private Long reviewId;
    private String comment;
    private Long productId;
    private int rating;
}
