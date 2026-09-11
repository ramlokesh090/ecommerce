package com.ramlokesh.ecommerce.Service;

import com.ramlokesh.ecommerce.Entity.product.ProductImage;
import com.ramlokesh.ecommerce.Entity.product.productAmount;
import com.ramlokesh.ecommerce.Entity.product.productStock;
import com.ramlokesh.ecommerce.Entity.product.productdetails;
import com.ramlokesh.ecommerce.Repository.products.ProductImageRepo;
import com.ramlokesh.ecommerce.Repository.products.productAmountRepo;
import com.ramlokesh.ecommerce.Repository.products.productStockrepo;
import com.ramlokesh.ecommerce.Repository.products.productsRepo;
import com.ramlokesh.ecommerce.dto.Addproduct.AddProductresponse;
import com.ramlokesh.ecommerce.dto.Addproduct.DeleteProductResponse;
import com.ramlokesh.ecommerce.dto.Addproduct.productdto;
import com.ramlokesh.ecommerce.exception.ProductNotFound;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;


@Service
public class ProductService {
    @Autowired
    productAmountRepo amountRepo;
    @Autowired
    productsRepo repo;
    @Autowired
    productStockrepo stockRepo;
    @Autowired
    ProductImageRepo imageRepo;
    @Transactional
    public AddProductresponse Addproduct(productdto product, MultipartFile image) throws IOException {
        boolean isNewProduct = product.getProductId()==null;
        productdetails details;
        if(isNewProduct){details = new productdetails();}
        else{
            details=repo.findById(product.getProductId()).orElseThrow(()->
                    new ProductNotFound(product.getProductId()+" product Id is Not Found so updating is not possible")
            );
        }
        details.setProductId(product.getProductId());
        details.setProductName(product.getProductName());
        details.setCategory(product.getCategory());
        details.setBrand(product.getBrand());
        details.setWeight(product.getWeight());
        details.setCreatedBy(product.getCreatedBy());
        details.setDescription(product.getDescription());
        details.setShipping(product.getShipping());
        details.setWarrenty(product.getWarrenty());
        productdetails savedproduct=repo.save(details);
        Long productId=savedproduct.getProductId();
        Long userId= savedproduct.getCreatedBy();

        ProductImage productImage;
        if(isNewProduct){
            productImage = new ProductImage();
        }
        else{
            productImage=imageRepo.findById(product.getProductId()).get();
        }
        byte[] imageBytes = image.getBytes();
        System.out.println("================================");
        System.out.println("IMAGE NAME: " + image.getOriginalFilename());
        System.out.println("IMAGE TYPE: " + image.getContentType());
        System.out.println("IMAGE SIZE: " + imageBytes.length);
        System.out.println("IMAGE DATA JAVA TYPE: " + imageBytes.getClass());
        System.out.println("PRODUCT ID: " + productId);
        System.out.println("================================");
        productImage.setProductId(productId);
        productImage.setFileName(image.getOriginalFilename());
        productImage.setContentType(image.getContentType());
        productImage.setImageData(image.getBytes());
        imageRepo.save(productImage);

        productAmount amount;
        if(isNewProduct){
            amount=new productAmount();
        }
        else{
            amount=amountRepo.findById(product.getProductId()).get();
        }
        amount.setProductId(productId);
        amount.setDiscount(product.getAmount().getDiscount());
        amount.setPrice(product.getAmount().getPrice());

        amountRepo.save(amount);

        productStock stock;
        if(isNewProduct){stock= new productStock();}
        else{
            stock=stockRepo.findById(product.getProductId()).get();
        }
        stock.setProductId(productId);
        stock.setCapacity(product.getStock().getCapacity());
        stock.setTotalstock(product.getStock().getTotalStock());

        stockRepo.save(stock);
        if(product.getProductId() == null )
        return new AddProductresponse(
                201,
                productId,
                userId,
                "product added successfully"
        );
        else
            return new AddProductresponse(
                    204,
                    productId,
                    userId,
                    "product updated successfully"
            );
    }

    public DeleteProductResponse Deleteproduct(Long id) {
        repo.deleteById(id);
        stockRepo.deleteById(id);
        amountRepo.deleteById(id);
        imageRepo.deleteById(id);
        return new DeleteProductResponse(
                201,
                id,
                "product deleted successfully"
        );
    }
}
