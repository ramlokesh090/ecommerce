package com.ramlokesh.ecommerce.Repository.products;

import com.ramlokesh.ecommerce.Entity.product.productdetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface productsRepo extends JpaRepository<productdetails,Long> {
    public Optional<List<productdetails>> findByCreatedBy(Long id);
}
