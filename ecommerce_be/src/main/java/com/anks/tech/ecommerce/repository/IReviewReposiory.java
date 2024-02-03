package com.anks.tech.ecommerce.repository;

import com.anks.tech.ecommerce.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IReviewReposiory extends JpaRepository<Review,Integer> {
}
