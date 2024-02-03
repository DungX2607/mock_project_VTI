package com.anks.tech.ecommerce.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "`infomation`", catalog = "ecommerce")
@Getter
@Setter
@NoArgsConstructor

public class Information {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "wattage", length = 10)
    private String wattage;
    @Column(name = "noise", length = 10)
    private String noise;
    @Column(name = "technology", length = 100)
    private String technology;
    @Column(name = "level", length = 200)
    private String level;
    @Column(name = "mode", length = 300)
    private String mode;
    @Column(name = "accessory", length = 200)
    private String accessory;
    @Column(name = "size", length = 100)
    private String size;
    @Column(name = "Weight", length = 10)
    private String Weight;
    @Column(name = "color", length = 50)
    private String color;
    @Column(name = "funtion", columnDefinition = "TEXT")
    private String otherFunction;

    @Override
    public String toString() {
        return "Information{" +
                "id=" + id +
                ", wattage='" + wattage + '\'' +
                ", noise='" + noise + '\'' +
                ", technology='" + technology + '\'' +
                ", level='" + level + '\'' +
                ", mode='" + mode + '\'' +
                ", accessory='" + accessory + '\'' +
                ", size='" + size + '\'' +
                ", Weight='" + Weight + '\'' +
                ", color='" + color + '\'' +
                ", otherFunction='" + otherFunction + '\'' +
                '}';
    }
}
