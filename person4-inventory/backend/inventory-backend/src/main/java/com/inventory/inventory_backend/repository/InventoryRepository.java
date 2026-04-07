package com.inventory.inventory_backend.repository;

import com.inventory.inventory_backend.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
}
