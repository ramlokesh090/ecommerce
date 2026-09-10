package com.ramlokesh.ecommerce.Repository.products;

import com.ramlokesh.ecommerce.Entity.product.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductImageRepo extends JpaRepository<ProductImage,Long> {
    Optional<ProductImage> findByProductId(Long productId);
}
