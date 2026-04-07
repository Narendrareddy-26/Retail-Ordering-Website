package com.retail.auth.service;

import com.retail.auth.model.AuthRequest;
import com.retail.auth.model.AuthResponse;
import com.retail.auth.model.User;
import com.retail.auth.repository.UserRepository;
import com.retail.auth.security.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * Register new user
     */
    public AuthResponse register(AuthRequest request) {
        // Validate input
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Name is required")
                    .build();
        }

        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Email is required")
                    .build();
        }

        if (request.getPassword() == null || request.getPassword().length() < 6) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Password must be at least 6 characters long")
                    .build();
        }

        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return AuthResponse.builder()
                    .success(false)
                    .message("User with this email already exists")
                    .build();
        }

        // Set default role if not provided
        String role = request.getRole() != null ? request.getRole() : "user";

        // Hash password
        String passwordHash = passwordEncoder.encode(request.getPassword());

        // Create user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .passwordHash(passwordHash)
                .role(role)
                .build();

        User savedUser = userRepository.save(user);

        // Generate token
        String token = jwtTokenProvider.generateTokenWithClaims(
                savedUser.getEmail(),
                savedUser.getId().toString(),
                savedUser.getRole()
        );

        return AuthResponse.builder()
                .success(true)
                .message("User registered successfully")
                .user(AuthResponse.UserDTO.builder()
                        .id(savedUser.getId())
                        .name(savedUser.getName())
                        .email(savedUser.getEmail())
                        .role(savedUser.getRole())
                        .build())
                .token(token)
                .build();
    }

    /**
     * Login user
     */
    public AuthResponse login(AuthRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Email and password are required")
                    .build();
        }

        // Find user by email
        Optional<User> userOptional;
        
        if (request.getRole() != null && !request.getRole().isEmpty()) {
            userOptional = userRepository.findByEmailAndRole(request.getEmail(), request.getRole());
        } else {
            userOptional = userRepository.findByEmail(request.getEmail());
        }

        if (userOptional.isEmpty()) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Invalid email or password")
                    .build();
        }

        User user = userOptional.get();

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Invalid email or password")
                    .build();
        }

        // Generate token
        String token = jwtTokenProvider.generateTokenWithClaims(
                user.getEmail(),
                user.getId().toString(),
                user.getRole()
        );

        return AuthResponse.builder()
                .success(true)
                .message("Login successful")
                .user(AuthResponse.UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .build())
                .token(token)
                .build();
    }

    /**
     * Get user profile
     */
    public AuthResponse getProfile(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return AuthResponse.builder()
                    .success(false)
                    .message("User not found")
                    .build();
        }

        User user = userOptional.get();

        return AuthResponse.builder()
                .success(true)
                .user(AuthResponse.UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .build())
                .build();
    }

    /**
     * Update user profile
     */
    public AuthResponse updateProfile(String email, String name) {
        if (name == null || name.trim().isEmpty()) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Name is required")
                    .build();
        }

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return AuthResponse.builder()
                    .success(false)
                    .message("User not found")
                    .build();
        }

        User user = userOptional.get();
        user.setName(name);
        User updatedUser = userRepository.save(user);

        return AuthResponse.builder()
                .success(true)
                .message("Profile updated successfully")
                .user(AuthResponse.UserDTO.builder()
                        .id(updatedUser.getId())
                        .name(updatedUser.getName())
                        .email(updatedUser.getEmail())
                        .role(updatedUser.getRole())
                        .build())
                .build();
    }
}
