package com.anks.tech.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "`reviews`", catalog = "ecommerce")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Column(name = "reviewId")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name = "reviewText", columnDefinition = "TEXT")
    private String reviewText;

    @Column(name = "rating")
    private double rating;

    @ManyToOne
    @JoinColumn(name = "productId")
    private Product product;

}
