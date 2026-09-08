package com.ramlokesh.ecommerce.Controller;


import com.ramlokesh.ecommerce.Service.ProductService;
import com.ramlokesh.ecommerce.Service.getProductService;
import com.ramlokesh.ecommerce.dto.Addproduct.AddProductresponse;
import com.ramlokesh.ecommerce.dto.Addproduct.DeleteProductResponse;
import com.ramlokesh.ecommerce.dto.Addproduct.productdto;
import com.ramlokesh.ecommerce.exception.ProductNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
//we have a golbal method in the securityconfig file so no need to add the crossorigin annotation

public class productController {
    @Autowired
    ProductService service;

    @Autowired
    getProductService getService;

    @PostMapping("/products")
    public ResponseEntity<?> Addproduct(@RequestBody productdto product){
            AddProductresponse response = service.Addproduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @GetMapping("/products")
    public ResponseEntity<List<productdto>> getAllProducts(){
        List<productdto> products = getService.getAllproducts();
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }
    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductByID(@PathVariable Long id){ // "?" we have pass any type of response
        try {
            productdto product = getService.getproductbyId(id);
            return ResponseEntity.status(HttpStatus.OK).body(product);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.OK).body(id+" id not found");
        }
    }
//     here without try catch it will use as exception hanler
// it will use inside only this product controller if we want to global then writ this in a class with
// "@RestControllerAdvice" annotation okay
//    @ExceptionHandler(ProductNotFound.class)
//    public ResponseEntity<String> handleProductNotFound(
//            ProductNotFound e) {
//
//        return ResponseEntity
//                .status(HttpStatus.NOT_FOUND)
//                .body(e.getMessage());
//    }
    @PutMapping("/products")
    public ResponseEntity<?> Updateproduct(@RequestBody productdto product){
        try {
            AddProductresponse response = service.Addproduct(product);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(e.getMessage());
        }
    }
    @DeleteMapping("/products/{id}")
    public ResponseEntity<DeleteProductResponse> Deleteproduct(@PathVariable Long id){
        DeleteProductResponse response =  service.Deleteproduct(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }
    @GetMapping("/products/userid/{id}")
    public ResponseEntity<List<productdto>> getproductsbyuserid(@PathVariable Long id){
        List<productdto> productsByUserId=getService.getproductsbyuserId(id);
        return  ResponseEntity.status(HttpStatus.OK).body(productsByUserId);

    }
}
