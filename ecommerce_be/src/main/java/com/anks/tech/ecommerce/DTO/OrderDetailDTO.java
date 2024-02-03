package com.anks.tech.ecommerce.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrderDetailDTO {
    private int orderDetailsId;
    private int productQuantity;
    private Product product;
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Product {
        private int id;
        private String productName;
        private double price;
        private double priceSales;
    }
}
