package com.inventory.inventory_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "inventory")
@Data
public class Inventory {

    @Id
    @Column(name = "product_id")
    private Integer productId;

    @Column(nullable = false)
    private Integer quantity;
}