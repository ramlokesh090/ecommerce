package com.ramlokesh.ecommerce.dto.Addproduct;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeleteProductResponse {
    private int statuscode;
    private Long productId;
    private String Message;
}
