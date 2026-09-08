package com.ramlokesh.ecommerce.Repository.products;

import com.ramlokesh.ecommerce.Entity.product.productAmount;
import com.ramlokesh.ecommerce.dto.Addproduct.stockDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface productAmountRepo extends JpaRepository<productAmount,Long> {
}
