package com.anks.tech.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "`category`", catalog = "ecommerce")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Column(name = "categoryId")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @GeneratedValue(generator = "uuid2")
//    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private int categoryId;

    @Column (name = "catagory", length = 50, nullable = false)
    private String category;

    @PrePersist
    public void prePersist() {
        if(this.category==null){
            this.category="product";
        }
    }

}
