# Person 4 Inventory Management (Spring Boot)

This implementation uses Spring Boot instead of Node/Express and satisfies the same API contract.

## DB Table

```sql
CREATE TABLE inventory (
    product_id INT PRIMARY KEY REFERENCES products(id),
    quantity INT NOT NULL
);
```

Reference implementation SQL is available in:
- backend/inventory-backend/src/main/resources/schema.sql

## APIs

### POST /inventory/update
Purpose: internal endpoint triggered after order confirmation to reduce stock.

JSON request body:
```json
{
  "productId": 101,
  "quantity": 2
}
```

Alternative request style also supported:
- `/inventory/update?productId=101&quantity=2`

Responses:
- `Stock updated successfully`
- `Product not found`
- `Insufficient stock`

### GET /inventory
Purpose: fetch current stock for frontend/admin.

Response: list of inventory rows.

## Spring Boot Sources

- Controller: backend/inventory-backend/src/main/java/com/inventory/inventory_backend/controller/InventoryController.java
- Service: backend/inventory-backend/src/main/java/com/inventory/inventory_backend/service/InventoryService.java
- Entity: backend/inventory-backend/src/main/java/com/inventory/inventory_backend/entity/Inventory.java
