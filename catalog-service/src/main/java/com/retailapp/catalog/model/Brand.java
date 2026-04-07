package com.retailapp.catalog.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "brands")
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String logoUrl;
    private String description;
}