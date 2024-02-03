package com.anks.tech.ecommerce.Services.FileProduct;

import com.anks.tech.ecommerce.entity.FileProduct;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Stream;

public interface IFileProductServices {
    public FileProduct store(MultipartFile file) throws IOException;
    public FileProduct getFile(String id);
    public Stream<FileProduct> getAllFiles();
}
