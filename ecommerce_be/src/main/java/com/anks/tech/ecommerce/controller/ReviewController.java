package com.anks.tech.ecommerce.controller;

import com.anks.tech.ecommerce.entity.Review;
import com.anks.tech.ecommerce.form.ReviewForm;
import com.anks.tech.ecommerce.Services.Review.IReviewServices;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/reviews", produces = "application/json")
@ResponseBody
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:3000"})

public class ReviewController {

    @Autowired
    IReviewServices reviewServices;
    @Autowired
    ModelMapper modelMapper;
    @GetMapping
    public ResponseEntity<Page<Review>> getAllReview (Pageable pageable){
        Page<Review> reviewPage = reviewServices.getAllReview(pageable);
        List<Review> reviews = reviewPage.getContent();

        return  ResponseEntity.ok().body(new PageImpl<>(reviews, pageable,reviewPage.getTotalElements()));
    }

    @PostMapping("/new-review")
    public  ResponseEntity<String> createNewReview(@RequestBody  ReviewForm form){

//        System.out.println(form.getReviewText() +" " + form.getUsername());
        reviewServices.createReview(form);
        return ResponseEntity.ok().body("create successfully!");
    }
}
