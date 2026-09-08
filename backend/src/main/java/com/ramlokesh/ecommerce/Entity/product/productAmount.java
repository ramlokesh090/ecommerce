package com.ramlokesh.ecommerce.Entity.product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="productAmount")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class productAmount {
    @Id
    private Long productId;
    private int price;
    private int discount;
}
