CREATE TABLE IF NOT EXISTS inventory (
    product_id INT PRIMARY KEY,
    quantity INT NOT NULL,
    CONSTRAINT fk_inventory_product FOREIGN KEY (product_id) REFERENCES products(id)
);
