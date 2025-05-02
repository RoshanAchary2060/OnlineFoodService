package com.roshan.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.server.ServerWebExchange;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class AppConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.authorizeHttpRequests(
                        authorize -> authorize
                                .requestMatchers("/api/admin**").hasAnyRole("RESTAURANT_OWNER", "ADMIN")
                                .requestMatchers("/api/**").authenticated()
                                .requestMatchers("/jwt/**").permitAll()
                                .anyRequest().permitAll())
                .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()));  // Enable CORS with the custom configuration

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        return exchange -> {
            CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Example: Frontend origin
            corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            corsConfiguration.setAllowCredentials(true);
            corsConfiguration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
            corsConfiguration.setExposedHeaders(Arrays.asList("Authorization"));
            corsConfiguration.setMaxAge(3600L);  // Cache CORS response for 1 hour
            return corsConfiguration;
        };
    }

    @Bean
    PasswordEncoder pE() {
        return new BCryptPasswordEncoder();
    }
}
