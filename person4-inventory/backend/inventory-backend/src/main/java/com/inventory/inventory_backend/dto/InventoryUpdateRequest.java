package com.inventory.inventory_backend.dto;

import lombok.Data;

@Data
public class InventoryUpdateRequest {
    private Integer productId;
    private Integer quantity;
}
