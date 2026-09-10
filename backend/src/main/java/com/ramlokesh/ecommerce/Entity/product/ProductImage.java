package com.ramlokesh.ecommerce.Entity.product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "product_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductImage {

    @Id
    private Long productId;

    private String fileName;

    private String contentType;

    @Lob
    @Column(columnDefinition = "BYTEA")
    private byte[] imageData;
}
