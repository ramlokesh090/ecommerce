package com.ramlokesh.ecommerce.Service;

import com.ramlokesh.ecommerce.Entity.reviews;
import com.ramlokesh.ecommerce.Repository.reviewRepo;
import com.ramlokesh.ecommerce.dto.addreviewResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class reviewservice {
    @Autowired
    reviewRepo repo;

    public addreviewResponse postreview(reviews reviews) {
        try {
            reviews savedreview= repo.save(reviews);
            if(reviews.getReviewID()== null) {
                return new addreviewResponse(
                        savedreview.getReviewID(),
                        201,
                        "review created successfully"
                );
            }
            else {
                if(repo.existsById(reviews.getReviewID())) {
                    return new addreviewResponse(
                            reviews.getReviewID(),
                            200,
                            "review updated successfully"
                    );
                }
                else{
                    return new addreviewResponse(
                            reviews.getReviewID(),
                            404,
                            "review updated successfully"
                    );
                }
            }
        }
        catch (Exception e) {
            if(reviews.getReviewID()== null) {
                return new addreviewResponse(
                        null,
                        500,
                        "failed to create review"
                );
            }
            return new addreviewResponse(
                    reviews.getReviewID(),
                    500,
                    "failed to update review"
            );
        }
    }

    public addreviewResponse DeleteReview(Long id) {
        try {
            if(repo.existsById(id)) {
                repo.deleteById(id);
                return new addreviewResponse(
                        id,
                        204,
                        "review deleted successfully"
                );
            }
            else{
                return new addreviewResponse(
                        id,
                        404,
                        "review not found"
                );
            }
        } catch (RuntimeException e) {
            return new addreviewResponse(
                    id,
                    500,
                    "failed to delete review"
            );
        }
    }
}
