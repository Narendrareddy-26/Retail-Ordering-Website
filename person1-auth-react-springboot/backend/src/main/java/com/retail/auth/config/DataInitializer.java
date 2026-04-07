package com.retail.auth.config;

import com.retail.auth.model.User;
import com.retail.auth.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Slf4j
public class DataInitializer {

    @Bean
    public CommandLineRunner loadData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Check if users already exist
            if (userRepository.count() > 0) {
                log.info("Database already initialized");
                return;
            }

            log.info("Initializing database with sample users...");

            // Create sample user
            User user = User.builder()
                    .name("Sample User")
                    .email("user@example.com")
                    .passwordHash(passwordEncoder.encode("user@123"))
                    .role("user")
                    .build();

            // Create sample admin
            User admin = User.builder()
                    .name("Admin User")
                    .email("admin@example.com")
                    .passwordHash(passwordEncoder.encode("admin@123"))
                    .role("admin")
                    .build();

            userRepository.save(user);
            userRepository.save(admin);

            log.info("Sample users created successfully!");
            log.info("User: user@example.com / user@123");
            log.info("Admin: admin@example.com / admin@123");
        };
    }
}
