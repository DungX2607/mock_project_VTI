package com.anks.tech.ecommerce.controller;


import com.anks.tech.ecommerce.DTO.FileProductDTO;
import com.anks.tech.ecommerce.entity.FileProduct;
import com.anks.tech.ecommerce.Services.FileProduct.IFileProductServices;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@ResponseBody

@RequestMapping(value = "products/files", produces = {"application/json"})
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:3000"})

public class FileProductController {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    IFileProductServices fileProductServices;
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            fileProductServices.store(file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }


    @GetMapping()
    public ResponseEntity<List<FileProductDTO>> getListFiles() {
        List<FileProductDTO> files = fileProductServices.getAllFiles().map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("products/files/")
                    .path(dbFile.getId())
                    .toUriString();

            return new FileProductDTO(
                    dbFile.getFileName(),
                    fileDownloadUri,
                    dbFile.getFileType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    @GetMapping("/{id}")

    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        FileProduct fileDB = fileProductServices.getFile(id);


        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getFileName() + "\"")
                .body(fileDB.getData());
    }

}
