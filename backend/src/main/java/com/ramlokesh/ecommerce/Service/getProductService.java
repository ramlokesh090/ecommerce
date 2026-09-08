package com.ramlokesh.ecommerce.Service;

import com.ramlokesh.ecommerce.Entity.product.productAmount;
import com.ramlokesh.ecommerce.Entity.product.productStock;
import com.ramlokesh.ecommerce.Entity.product.productdetails;
import com.ramlokesh.ecommerce.Repository.products.productAmountRepo;
import com.ramlokesh.ecommerce.Repository.products.productStockrepo;
import com.ramlokesh.ecommerce.Repository.products.productsRepo;
import com.ramlokesh.ecommerce.dto.Addproduct.amountDto;
import com.ramlokesh.ecommerce.dto.Addproduct.productdto;
import com.ramlokesh.ecommerce.dto.Addproduct.stockDto;
import com.ramlokesh.ecommerce.exception.ProductNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class getProductService {
    @Autowired
    productAmountRepo amountRepo;
    @Autowired
    productsRepo repo;
    @Autowired
    productStockrepo stockRepo;

    public List<productdto> getAllproducts() {
        List<productdetails> products=repo.findAll();
        List<productAmount> amount=amountRepo.findAll();
        List<productStock> stock= stockRepo.findAll();
        Map<Long, amountDto> amountMap= amount.stream()
                .collect(Collectors.toMap(
                        amt->(amt.getProductId()),
                        amt->(new amountDto(
                                amt.getPrice(),
                                amt.getDiscount()
                        )
                )));
        Map<Long, stockDto> stockMap = stock.stream()
                .collect(Collectors.toMap(
                        productStock::getProductId,
                        stk->(new stockDto(
                                stk.getTotalstock(),
                                stk.getCapacity()
                        )
                        )));
        return products.stream()
               .map(product->
                new productdto(
                      product.getProductId(),
                      product.getCreatedBy(),
                      product.getProductName(),
                      product.getDescription(),
                      product.getImageurl(),
                      product.getWeight(),
                      product.getBrand(),
                      product.getCategory(),
                      amountMap.get(product.getProductId()),
                      stockMap.get(product.getProductId())
        )).toList();
    }

    public productdto getproductbyId( Long Id) {
        productdetails product=repo.findById(Id).orElseThrow(()->
                 new ProductNotFound("product not found")
        );
        productAmount amount=amountRepo.findById(Id).orElseThrow(()->
                 new ProductNotFound("product not found")
        );
        productStock stock= stockRepo.findById(Id).orElseThrow(()->
                 new ProductNotFound("product not found")
        );

        return new productdto(
                product.getProductId(),
                product.getCreatedBy(),
                product.getProductName(),
                product.getDescription(),
                product.getImageurl(),
                product.getWeight(),
                product.getBrand(),
                product.getCategory(),
                new amountDto(
                        amount.getPrice(),
                        amount.getDiscount()
                ),
                new stockDto(
                        stock.getTotalstock(),
                        stock.getCapacity()
                )
        );
    }

    public List<productdto> getproductsbyuserId(Long id) {
        List<productdetails> product=repo.findByCreatedBy(id).get();
        List<Long> productIds=product.stream()
                .map(productdetails::getProductId)
                .toList();
        Map<Long,amountDto> amountMap=amountRepo.findAllById(productIds).stream()
                .collect(Collectors.toMap(
                        productAmount::getProductId,
                        amt->new amountDto(amt.getPrice(),amt.getDiscount())
                ));
        Map<Long,stockDto> stockMap=stockRepo.findAllById(productIds).stream()
                .collect(Collectors.toMap(
                        productStock::getProductId,
                        stk->new stockDto(stk.getTotalstock(),stk.getCapacity())
                ));
        return product.stream()
                .map(prod->
                        new productdto(
                                prod.getProductId(),
                                prod.getCreatedBy(),
                                prod.getProductName(),
                                prod.getDescription(),
                                prod.getImageurl(),
                                prod.getWeight(),
                                prod.getBrand(),
                                prod.getCategory(),
                                amountMap.get(prod.getProductId()),
                                stockMap.get(prod.getProductId())
                        )
                ).toList();
    }
}
