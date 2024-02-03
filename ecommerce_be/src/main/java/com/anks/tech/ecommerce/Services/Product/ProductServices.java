package com.anks.tech.ecommerce.Services.Product;


import com.anks.tech.ecommerce.entity.*;
import com.anks.tech.ecommerce.form.CreateProductForm;
import com.anks.tech.ecommerce.form.UpdateProductForm;
import com.anks.tech.ecommerce.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
public class ProductServices implements IProductServices {
    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
     private IFileProductRepository fileProductRespository;

    @Autowired
    private IOriginRepository originRespository;

    @Autowired
    private IInformationRespository informationRespository;

    @Autowired
    ModelMapper modelMapper;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Product> getAllProduct(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Product getProductById(int id) {
        return productRepository.findById(id).get();
    }

    @Override
    public void createProduct(CreateProductForm form) {
        TypeMap typeMap = modelMapper.getTypeMap(CreateProductForm.class, Product.class);
        if (typeMap == null) {
            modelMapper.addMappings(new PropertyMap<CreateProductForm, Product>() {
                @Override
                protected void configure() {
                    skip(destination.getProductId());
                }
            });
        }

        Product product = modelMapper.map(form, Product.class);
        productRepository.save(product);

        Category category = product.getCategory();

        categoryRepository.save(category);

        FileProduct fileProduct = product.getFileProduct();
        fileProductRespository.save(fileProduct);

        Origin origin = product.getOrigin();
        originRespository.save(origin);

        Information information = modelMapper.map(product.getInformation(), Information.class);
        informationRespository.save(information);
    }

    @Override
    public void deleteProduct(int id) {
        Product product = entityManager.find(Product.class, id);
        if(product!=null) {
            product.setOrderDetails(null);
            entityManager.remove(product);
        }

    }

    @Override
    public void updateProduct(UpdateProductForm form) {
        try {
            System.out.println(form.getInformationForm().toString());

            if(productRepository.existsById(form.getProductId())){
                Product productUpdate = productRepository.findById(form.getProductId()).get();
                productUpdate.setOrderDetails(null);
                productUpdate = modelMapper.map(form,Product.class);
                productRepository.save(productUpdate);
            }
            if(categoryRepository.existsById(form.getCategory().getCategoryId())){
                Category categoryUpdate = categoryRepository.findById(form.getCategory().getCategoryId()).get();
                categoryUpdate = modelMapper.map(form.getCategory(), Category.class);
                categoryRepository.save(categoryUpdate);
            }
            if(originRespository.existsById(form.getOrigin().getId())){
                Origin originUpdate = originRespository.findById(form.getOrigin().getId()).get();
                originUpdate = modelMapper.map(form.getOrigin(), Origin.class);
                originRespository.save(originUpdate);
            }
            if(fileProductRespository.existsById(form.getFileProduct().getId())){
                FileProduct fileProductUpdate = fileProductRespository.findById(form.getFileProduct().getId()).get();
                fileProductUpdate = modelMapper.map(form.getFileProduct(), FileProduct.class);
                fileProductRespository.save(fileProductUpdate);

            }

            if (informationRespository.existsById(form.getInformationForm().getId())){
                Information informationUpdate = informationRespository.findById(form.getInformationForm().getId()).get();
                informationUpdate = modelMapper.map(form.getInformationForm(), Information.class);

                informationRespository.save(informationUpdate);
            }
        }
        catch (Exception exception){
            System.err.println(exception.toString());
        }



    }
}
