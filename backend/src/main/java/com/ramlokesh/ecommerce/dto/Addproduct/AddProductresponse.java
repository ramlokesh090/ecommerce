package com.ramlokesh.ecommerce.dto.Addproduct;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddProductresponse {
    private int statuscode;
    private Long productid;
    private Long createdBy;
    private String Message;
}
