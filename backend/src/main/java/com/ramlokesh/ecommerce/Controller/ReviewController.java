package com.ramlokesh.ecommerce.Controller;

import com.ramlokesh.ecommerce.Entity.reviews;
import com.ramlokesh.ecommerce.Service.getReviews;
import com.ramlokesh.ecommerce.Service.reviewservice;
import com.ramlokesh.ecommerce.dto.GetreviewResponse;
import com.ramlokesh.ecommerce.dto.addreviewResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReviewController {
    @Autowired
    reviewservice service;
    @Autowired
    getReviews getreviews;
    @PostMapping("/reviews")
    public ResponseEntity<?> addReview(@RequestBody reviews reviews){
        try{
            addreviewResponse reviewResponse = service.postreview(reviews);
            return ResponseEntity.status(HttpStatus.OK).body(reviewResponse);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PutMapping("/reviews")
    public ResponseEntity<?> updateReview(@RequestBody reviews reviews){
        try{
            addreviewResponse reviewResponse = service.postreview(reviews);
            return ResponseEntity.status(HttpStatus.OK).body(reviewResponse);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<?> DeleteReview(@PathVariable Long id){
        try{
            addreviewResponse reviewResponse = service.DeleteReview(id);
            return ResponseEntity.status(HttpStatus.OK).body(reviewResponse);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @GetMapping("/reviews/{id}")
    public ResponseEntity<?> GetReview(@PathVariable Long id){
        try{
            List<GetreviewResponse> getreviewResponse = getreviews.getreviewsbyproductId(id);
            return ResponseEntity.status(HttpStatus.OK).body(getreviewResponse);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
