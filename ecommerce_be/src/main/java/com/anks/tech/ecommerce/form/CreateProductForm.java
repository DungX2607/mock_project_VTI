package com.anks.tech.ecommerce.form;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateProductForm {

    private String productName;
    private String imgUrl;
    private double price;
    private double priceSales;
    private String shortDesc;
    private String description;
    private Category category;
    private FileProduct fileProduct;
    private Origin origin;
    private InformationForm informationForm;
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static  class Category {
        private String category;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FileProduct{
        private String id;
        private String fileName;
        private String fileType;
        private byte[] data;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Origin{
        private String manufacturer;
        private String madeIn;
        private String guarantee;
    }



}
