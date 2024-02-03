package com.anks.tech.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
@Table(name = "`fileTable`", catalog = "ecommerce")
@Getter
@Setter
@NoArgsConstructor
public class FileProduct {
    @Id
    @Column(name = "uuid")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    @Column(name = "imgname", nullable = false)
    private String fileName;
    @Column(name = "typeImg", nullable = false)
    private String fileType;

    @Lob
    @Column(name = "imgdata", columnDefinition = "Lob", nullable = false)
    private byte[] data;

}
