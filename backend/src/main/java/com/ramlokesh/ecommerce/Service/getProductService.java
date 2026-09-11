package com.ramlokesh.ecommerce.Service;

import com.ramlokesh.ecommerce.Entity.product.ProductImage;
import com.ramlokesh.ecommerce.Entity.product.productAmount;
import com.ramlokesh.ecommerce.Entity.product.productStock;
import com.ramlokesh.ecommerce.Entity.product.productdetails;
import com.ramlokesh.ecommerce.Repository.products.ProductImageRepo;
import com.ramlokesh.ecommerce.Repository.products.productAmountRepo;
import com.ramlokesh.ecommerce.Repository.products.productStockrepo;
import com.ramlokesh.ecommerce.Repository.products.productsRepo;
import com.ramlokesh.ecommerce.dto.Addproduct.GetProductdto;
import com.ramlokesh.ecommerce.dto.Addproduct.amountDto;
import com.ramlokesh.ecommerce.dto.Addproduct.productdto;
import com.ramlokesh.ecommerce.dto.Addproduct.stockDto;
import com.ramlokesh.ecommerce.exception.ProductNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class getProductService {
    @Autowired
    productAmountRepo amountRepo;
    @Autowired
    productsRepo repo;
    @Autowired
    productStockrepo stockRepo;
    @Autowired
    ProductImageRepo imageRepo;
    public List<GetProductdto> getAllproducts() {
        List<productdetails> products=repo.findAll();
        List<productAmount> amount=amountRepo.findAll();
        List<productStock> stock= stockRepo.findAll();
        List<ProductImage> Image= imageRepo.findAll();
        Map<Long, amountDto> amountMap= amount.stream()
                .collect(Collectors.toMap(
                        amt->(amt.getProductId()),
                        amt->(new amountDto(
                                amt.getPrice(),
                                amt.getDiscount()
                        )
                )));
        Map<Long, ProductImage> ImageMap= Image.stream()
                .collect(Collectors.toMap(
                        img->(img.getProductId()),
                        img->(img
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
               .map(product->{
                return new GetProductdto(
                      product.getProductId(),
                      product.getCreatedBy(),
                      product.getProductName(),
                      product.getDescription(),
                        Base64.getEncoder().encodeToString(ImageMap.get(product.getProductId()).getImageData()),
                        ImageMap.get(product.getProductId()).getContentType(),
                      product.getWeight(),
                      product.getBrand(),
                      product.getCategory(),
                      product.getShipping(),
                      product.getWarrenty(),
                      amountMap.get(product.getProductId()),
                      stockMap.get(product.getProductId())
        );}).toList();
    }

    public GetProductdto getproductbyId( Long Id) {
        productdetails product=repo.findById(Id).orElseThrow(()->
                 new ProductNotFound("product not found")
        );
        productAmount amount=amountRepo.findById(Id).orElseThrow(()->
                 new ProductNotFound("product not found")
        );
        productStock stock= stockRepo.findById(Id).orElseThrow(()->
                 new ProductNotFound("product not found")
        );
        ProductImage Image=imageRepo.findById(Id).orElseThrow(()->
                new ProductNotFound("Product not Found")
                );
        return new GetProductdto(
                product.getProductId(),
                product.getCreatedBy(),
                product.getProductName(),
                product.getDescription(),
                Base64.getEncoder().encodeToString(Image.getImageData()),
                Image.getContentType(),
                product.getWeight(),
                product.getBrand(),
                product.getCategory(),
                product.getShipping(),
                product.getWarrenty(),
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

    public List<GetProductdto> getproductsbyuserId(Long id) {
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
        Map<Long, ProductImage> ImageMap= imageRepo.findAllById(productIds).stream()
                .collect(Collectors.toMap(
                        img->(img.getProductId()),
                        img->(img
                        )));
        return product.stream()
                .map(prod->
                        new GetProductdto(
                                prod.getProductId(),
                                prod.getCreatedBy(),
                                prod.getProductName(),
                                prod.getDescription(),
                                Base64.getEncoder().encodeToString(ImageMap.get(prod.getProductId()).getImageData()),
                                ImageMap.get(prod.getProductId()).getContentType(),
                                prod.getWeight(),
                                prod.getBrand(),
                                prod.getCategory(),
                                prod.getShipping(),
                                prod.getWarrenty(),
                                amountMap.get(prod.getProductId()),
                                stockMap.get(prod.getProductId())
                        )
                ).toList();
    }
}
