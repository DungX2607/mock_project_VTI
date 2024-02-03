package com.anks.tech.ecommerce.DTO;



import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private int id;
    private String productName;
    private String imgUrl;
    private double price;
    private double priceSales;
    private String shortDesc;
    private String description;
    private double avgRating;

    private String category;
    private int categoryId;
    List<Review> reviews;

    private File file;
    private Origin origin;
    private Information information;



    @Getter
    @Setter
    @NoArgsConstructor

    public static class Review {
        private int reviewId;
        private String username;
        private String reviewText;
        private Double rating;

    }

    @Setter
    @Getter
    @NoArgsConstructor
    public  static  class File{
        private String id;
        private String fileName;
        private String fileType;
        private String url;
//        private byte[] data;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Origin{
        private int id;
        private String manufacturer;
        private String madeIn;
        private String guarantee;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public  static  class  Information{

        private int id;

        private String wattage;

        private String noise;

        private String technology;

        private String level;

        private String mode;

        private String accessory;

        private String size;

        private String Weight;

        private String color;

        private String otherFunction;

    }
}
