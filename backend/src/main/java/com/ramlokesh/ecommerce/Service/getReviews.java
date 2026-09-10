package com.ramlokesh.ecommerce.Service;

import com.ramlokesh.ecommerce.Entity.Users;
import com.ramlokesh.ecommerce.Entity.reviews;
import com.ramlokesh.ecommerce.Repository.reviewRepo;
import com.ramlokesh.ecommerce.Repository.userRepo;
import com.ramlokesh.ecommerce.dto.GetreviewResponse;
import com.ramlokesh.ecommerce.exception.ReviewNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class getReviews {
    @Autowired
    reviewRepo Repo;
    @Autowired
    userRepo userRepo;
    public List<GetreviewResponse> getreviewsbyproductId(Long id) {
        List<reviews> Allreviews = Repo.findByproductId(id).orElseThrow(()-> new ReviewNotFound("review is not found"));
        return Allreviews.stream()
                .map((review)->{
                    Users user = userRepo.findById(review.getUserId())
                            .orElseThrow(() ->
                                    new RuntimeException("User not found")
                            );
                        return new GetreviewResponse(
                             review.getUserId(),
                             user.getFirstName()+" "+user.getMiddleName()+" "+user.getLastName(),
                                user.getEmail(),
                                review.getReviewID(),
                                review.getComment(),
                                review.getProductId(),
                                review.getRating()
                );
                })
                .toList();
    }
}
