package com.anks.tech.ecommerce.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReviewForm {

    private String username;
    private double rating;
    private String reviewText;
    private int productId;

}
