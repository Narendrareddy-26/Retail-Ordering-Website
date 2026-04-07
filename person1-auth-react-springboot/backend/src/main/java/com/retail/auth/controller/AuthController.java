package com.retail.auth.controller;

import com.retail.auth.model.AuthRequest;
import com.retail.auth.model.AuthResponse;
import com.retail.auth.security.JwtTokenProvider;
import com.retail.auth.service.AuthService;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8081"}, allowCredentials = "true")
@Slf4j
public class AuthController {
    private final AuthService authService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(AuthService authService, JwtTokenProvider jwtTokenProvider) {
        this.authService = authService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * POST /api/auth/register
     * Register new user
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        try {
            log.info("Register request received: {}", request.getEmail());
            AuthResponse response = authService.register(request);
            if (response.isSuccess()) {
                return ResponseEntity.status(201).body(response);
            } else {
                return ResponseEntity.status(409).body(response);
            }
        } catch (Exception e) {
            log.error("Register error - Full stack trace:", e);
            log.error("Error message: {}", e.getMessage());
            return ResponseEntity.status(500).body(AuthResponse.builder()
                    .success(false)
                    .message("Internal server error: " + e.getMessage())
                    .build());
        }
    }

    /**
     * POST /api/auth/login
     * Login user
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        try {
            log.info("Login request received: {}", request.getEmail());
            AuthResponse response = authService.login(request);
            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(401).body(response);
            }
        } catch (Exception e) {
            log.error("Login error - Full stack trace:", e);
            log.error("Error message: {}", e.getMessage());
            return ResponseEntity.status(500).body(AuthResponse.builder()
                    .success(false)
                    .message("Internal server error: " + e.getMessage())
                    .build());
        }
    }

    /**
     * GET /api/auth/profile
     * Get user profile (protected route)
     */
    @GetMapping("/profile")
    public ResponseEntity<AuthResponse> getProfile(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken) {
        try {
            String token = bearerToken.substring(7);
            String email = jwtTokenProvider.getEmailFromJwt(token);

            AuthResponse response = authService.getProfile(email);
            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body(response);
            }
        } catch (Exception e) {
            log.error("Get profile error:", e);
            return ResponseEntity.status(401).body(AuthResponse.builder()
                    .success(false)
                    .message("Unauthorized")
                    .build());
        }
    }

    /**
     * PUT /api/auth/profile
     * Update user profile (protected route)
     */
    @PutMapping("/profile")
    public ResponseEntity<AuthResponse> updateProfile(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken,
            @RequestBody AuthRequest request) {
        try {
            String token = bearerToken.substring(7);
            String email = jwtTokenProvider.getEmailFromJwt(token);

            AuthResponse response = authService.updateProfile(email, request.getName());
            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body(response);
            }
        } catch (Exception e) {
            log.error("Update profile error:", e);
            return ResponseEntity.status(401).body(AuthResponse.builder()
                    .success(false)
                    .message("Unauthorized")
                    .build());
        }
    }

    /**
     * GET /api/auth/admin-only
     * Admin only route (protected route)
     */
    @GetMapping("/admin-only")
    public ResponseEntity<AuthResponse> adminOnly(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken) {
        try {
            String token = bearerToken.substring(7);
            Claims claims = jwtTokenProvider.getClaimsFromJwt(token);
            String role = claims.get("role", String.class);

            if (!"admin".equals(role)) {
                return ResponseEntity.status(403).body(AuthResponse.builder()
                        .success(false)
                        .message("Forbidden. Only admin can access this resource.")
                        .build());
            }

            return ResponseEntity.ok(AuthResponse.builder()
                    .success(true)
                    .message("This is admin only route")
                    .build());
        } catch (Exception e) {
            log.error("Admin only error:", e);
            return ResponseEntity.status(401).body(AuthResponse.builder()
                    .success(false)
                    .message("Unauthorized")
                    .build());
        }
    }
}
