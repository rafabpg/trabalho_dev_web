package com.example.trabalho_02.security;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.trabalho_02.providers.JwtProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter  extends OncePerRequestFilter{
    
    @Autowired
    private JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    throws ServletException, IOException {
        SecurityContextHolder.getContext().setAuthentication(null);
        String clientToken = request.getHeader("Authorization");
        if(clientToken != null){
            var subject = this.jwtProvider.validateToken(clientToken);
            if(subject.isEmpty()){
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
            String userId = jwtProvider.getSubjectFromToken(clientToken);
            request.setAttribute("user_id", userId);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(clientToken, null,Collections.emptyList());
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        filterChain.doFilter(request, response);
    }


}
