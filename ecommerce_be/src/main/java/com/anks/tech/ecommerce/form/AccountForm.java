package com.anks.tech.ecommerce.form;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AccountForm {

    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String phone;
    private String password;
    private FileProduct fileProduct;

    public AccountForm(String username, String email, String firstName, String lastName, String address, String phone, String password) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.password = password;
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


}
