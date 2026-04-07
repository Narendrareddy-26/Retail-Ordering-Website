package com.person3.cartorders.routes;

import com.person3.cartorders.controllers.cartController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class cart {

    @Autowired
    private cartController cartCtrl;

    @GetMapping
    public Object getCart(@RequestHeader("Authorization") String token) {
        return cartCtrl.getCart(token);
    }

    @PostMapping("/add")
    public String addToCart(@RequestHeader("Authorization") String token, @RequestBody Object cart) {
        return cartCtrl.addToCart(token, cart);
    }

    @PostMapping("/remove")
    public String removeFromCart(@RequestHeader("Authorization") String token, @RequestBody Object cart) {
        return cartCtrl.removeFromCart(token, cart);
    }
}