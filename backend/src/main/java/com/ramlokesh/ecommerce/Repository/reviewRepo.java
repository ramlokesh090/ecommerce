package com.ramlokesh.ecommerce.Repository;

import com.ramlokesh.ecommerce.Entity.reviews;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface reviewRepo extends JpaRepository<reviews,Long> {
    Optional<List<reviews>> findByproductId(long id);
}
