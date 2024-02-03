package com.anks.tech.ecommerce.Services.Review;


import com.anks.tech.ecommerce.entity.Review;
import com.anks.tech.ecommerce.form.ReviewForm;
import com.anks.tech.ecommerce.repository.IReviewReposiory;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
public class ReviewServices implements IReviewServices{

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    IReviewReposiory reviewReposiory;

    @Override
    public void createReview(ReviewForm form) {
        TypeMap typeMap = modelMapper.getTypeMap(ReviewForm.class, Review.class);
        if (typeMap == null) {

            modelMapper.addMappings(new PropertyMap<ReviewForm, Review>() {
                @Override
                protected void configure() {
                    skip(destination.getReviewId());
                }
            });
        }
        Review review = modelMapper.map(form, Review.class);
        reviewReposiory.save(review);
    }

    @Override
    public Page<Review> getAllReview(Pageable pageable) {
        return reviewReposiory.findAll(pageable);
    }
}
