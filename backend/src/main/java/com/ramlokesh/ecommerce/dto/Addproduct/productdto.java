package com.ramlokesh.ecommerce.dto.Addproduct;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.RestController;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class productdto {
    private Long productId;
    private Long createdBy;
    private String productName;
    private String description;
//    private String image;
    private String image;
    private String contentType;
    private int weight;
    private String brand;
    private String category;
    private int shipping;
    private amountDto amount;
    private stockDto stock;

}
