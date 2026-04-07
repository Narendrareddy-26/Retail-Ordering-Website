package com.retailapp.catalog.repository;

import com.retailapp.catalog.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategoryId(Integer categoryId);
    List<Product> findByBrandId(Integer brandId);
}