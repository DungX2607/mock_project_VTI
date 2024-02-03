package com.anks.tech.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "`origin`", catalog = "ecommerce")
@Getter
@Setter
@NoArgsConstructor
public class Origin {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "manufacturer", length = 50)
    private String manufacturer;
    @Column(name = "madeIn", length = 50)
    private String madeIn;
    @Column(name = "guarantee", length = 50)
    private String guarantee;

}
