package com.ramlokesh.ecommerce.Entity.product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="productStock")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class productStock {
    @Id
    private Long productId;
    private int totalstock;
    private int capacity;
}
