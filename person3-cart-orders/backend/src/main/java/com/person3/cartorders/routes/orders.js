package com.person3.cartorders.routes;

import com.person3.cartorders.controllers.orderController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class orders {

    @Autowired
    private orderController orderCtrl;

    @PostMapping("/place")
    public Object placeOrder(@RequestHeader("Authorization") String token) {
        return orderCtrl.placeOrder(token);
    }

    @GetMapping("/{id}")
    public Object getOrder(@PathVariable Long id) {
        return orderCtrl.getOrder(id);
    }
}