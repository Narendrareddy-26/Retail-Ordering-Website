package com.inventory.inventory_backend.controller;

import com.inventory.inventory_backend.dto.InventoryUpdateRequest;
import com.inventory.inventory_backend.entity.Inventory;
import com.inventory.inventory_backend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
@CrossOrigin
public class InventoryController {

    @Autowired
    private InventoryService service;

    @GetMapping
    public List<Inventory> getAll() {
        return service.getAll();
    }

    @PostMapping("/update")
    public String update(@RequestBody InventoryUpdateRequest request) {
        return service.updateStock(request.getProductId(), request.getQuantity());
    }

    @PostMapping(value = "/update", params = {"productId", "quantity"})
    public String update(
            @RequestParam Integer productId,
            @RequestParam Integer quantity) {

        return service.updateStock(productId, quantity);
    }
}