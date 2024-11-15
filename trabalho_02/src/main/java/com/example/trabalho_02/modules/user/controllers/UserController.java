package com.example.trabalho_02.modules.user.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.trabalho_02.modules.user.model.User;
import com.example.trabalho_02.modules.user.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserService usuarioService;

    @GetMapping
    public ResponseEntity<Object> buscarUsuarioPorId(HttpServletRequest request) {
        try {
            String usuarioId = (String) request.getAttribute("user_id");
            User usuario = this.usuarioService.buscarUsuarioPorCpf(usuarioId);
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar o usuário: " + e.getMessage());
        }

    }

    @PostMapping
    public ResponseEntity<Object> salvarUsuario(@Valid @RequestBody User usuario) {
         try {
            User user = this.usuarioService.salvarUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
         } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
         }
    }
}
