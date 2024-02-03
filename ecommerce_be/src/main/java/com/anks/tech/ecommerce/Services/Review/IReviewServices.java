package com.anks.tech.ecommerce.Services.Review;

import com.anks.tech.ecommerce.entity.Review;
import com.anks.tech.ecommerce.form.ReviewForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IReviewServices {

    void createReview(ReviewForm form);

    Page<Review> getAllReview(Pageable pageable);
}
