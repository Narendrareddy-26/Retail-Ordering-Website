package com.person3.cartorders.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@Controller
public class orderController {

    private static Long orderIdCounter = 1L;
    private static Map<Long, Map<String, Object>> ordersDB = new HashMap<>();

    private cartController cartCtrl = new cartController();

    public Map<String, Object> placeOrder(String token) {
        Long userId = getUserIdFromToken(token);
        List<Map<String, Object>> cartItems = cartCtrl.getCart(token);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Map<String, Object> order = new HashMap<>();
        order.put("id", orderIdCounter++);
        order.put("userId", userId);
        order.put("status", "confirmed");
        order.put("items", new ArrayList<>(cartItems));

        // calculate total amount
        double total = 0;
        for (Map<String, Object> item : cartItems) {
            total += ((int)item.get("quantity")) * 100; // placeholder price, call Person 2 API in real app
        }
        order.put("totalAmount", total);

        ordersDB.put((Long)order.get("id"), order);

        // clear cart
        cartCtrl.getCart(token).clear();

        // TODO: call Person 4 inventory update API

        return order;
    }

    public Map<String, Object> getOrder(Long id) {
        if (!ordersDB.containsKey(id)) throw new RuntimeException("Order not found");
        return ordersDB.get(id);
    }

    private Long getUserIdFromToken(String token) {
        // TODO: integrate with Person 1 JWT service
        return 1L; // placeholder
    }
}