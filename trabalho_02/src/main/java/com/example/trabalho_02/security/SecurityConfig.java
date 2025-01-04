package com.example.trabalho_02.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private SecurityFilter securityFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> {
                auth.requestMatchers("/auth/login").permitAll();
                auth.requestMatchers("/user").permitAll();
                auth.requestMatchers("/category").permitAll();
                auth.requestMatchers("/category/{id}").permitAll();
                auth.requestMatchers("/catalog/movie").permitAll();
                auth.requestMatchers("/catalog/movie/{id}").permitAll();
                auth.requestMatchers("/catalog/series/{id}").permitAll();
                auth.requestMatchers("/catalog/series").permitAll();
                auth.anyRequest().authenticated();
            })
            .addFilterBefore(securityFilter, BasicAuthenticationFilter.class);
        return http.build();
    }
    
    @Bean
    CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("*"); 
        config.addAllowedMethod("*");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedHeader("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }


    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
