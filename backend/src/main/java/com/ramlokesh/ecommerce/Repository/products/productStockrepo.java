package com.ramlokesh.ecommerce.Repository.products;

import com.ramlokesh.ecommerce.Entity.product.productStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface productStockrepo extends JpaRepository<productStock,Long> {
}
