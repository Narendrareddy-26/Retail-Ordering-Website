package com.retailapp.catalog.repository;

import com.retailapp.catalog.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, Integer> {
}