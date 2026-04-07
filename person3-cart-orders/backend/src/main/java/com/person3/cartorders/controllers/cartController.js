package com.person3.cartorders.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@Controller
public class cartController {

    // Placeholder in-memory storage for hackathon/demo
    private static Map<Long, List<Map<String, Object>>> cartDB = new HashMap<>();

    public List<Map<String, Object>> getCart(String token) {
        Long userId = getUserIdFromToken(token);
        return cartDB.getOrDefault(userId, new ArrayList<>());
    }

    public String addToCart(String token, Map<String, Object> cartItem) {
        Long userId = getUserIdFromToken(token);
        cartItem.put("productId", cartItem.get("productId"));
        cartItem.put("quantity", cartItem.get("quantity"));
        cartDB.computeIfAbsent(userId, k -> new ArrayList<>()).add(cartItem);
        return "Added to cart";
    }

    public String removeFromCart(String token, Map<String, Object> cartItem) {
        Long userId = getUserIdFromToken(token);
        List<Map<String, Object>> items = cartDB.get(userId);
        if (items != null) {
            items.removeIf(i -> i.get("productId").equals(cartItem.get("productId")));
        }
        return "Removed from cart";
    }

    private Long getUserIdFromToken(String token) {
        // TODO: Integrate with Person 1 JWT service
        return 1L; // placeholder userId
    }
}