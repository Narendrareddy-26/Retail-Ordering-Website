package com.inventory.inventory_backend.service;

import com.inventory.inventory_backend.entity.Inventory;
import com.inventory.inventory_backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository repo;

    public List<Inventory> getAll() {
        return repo.findAll();
    }

    public String updateStock(Integer productId, Integer qty) {
        Inventory item = repo.findById(productId).orElse(null);

        if (item == null) {
            return "Product not found";
        }

        if (item.getQuantity() < qty) {
            return "Insufficient stock";
        }

        item.setQuantity(item.getQuantity() - qty);
        repo.save(item);

        return "Stock updated successfully";
    }
}
