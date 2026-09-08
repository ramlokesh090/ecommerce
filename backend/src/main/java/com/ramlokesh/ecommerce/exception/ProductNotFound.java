package com.ramlokesh.ecommerce.exception;

public class ProductNotFound  extends RuntimeException{
    public ProductNotFound(String message){
        super(message);
    }
}
