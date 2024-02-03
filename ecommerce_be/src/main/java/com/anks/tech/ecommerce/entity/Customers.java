package com.anks.tech.ecommerce.entity;

import com.anks.tech.ecommerce.entity.Order;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity
@Data
@Table(name = "`customers`", catalog = "ecommerce")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Customers {

    @Column(name = "customersId")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customersId;
    @Column(name = "fullname", length = 50, nullable = false)
    private String fullName;
    @Column(name = "email" ,length = 50, nullable = false)
    private String email;
    @Column(name = "phone",  length = 50, nullable = false)
    private String phone;
    @Column(name = "address",  columnDefinition = "TEXT", nullable = false)
    private String address;
    @Column(name = "city",  length = 50, nullable = false)
    private String city;
    @Column(name = "postalcode", length = 50)
    private int postalCode;
    @Column(name = "country")
    private String country;

    @OneToMany(mappedBy = "customers", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private List<Order> orders;


    @PrePersist
    public void prePersist(){
        if(this.country==null){
            this.country ="VIET NAM";
        }
    }

}
