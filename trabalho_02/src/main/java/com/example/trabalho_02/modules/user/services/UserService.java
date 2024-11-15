package com.example.trabalho_02.modules.user.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.trabalho_02.modules.user.model.User;
import com.example.trabalho_02.modules.user.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User buscarUsuarioPorCpf(String cpf) {
        return this.usuarioRepository.findByCpf(cpf).orElse(null);
    }


    public User salvarUsuario(User usuario) {
        this.usuarioRepository.findByCpf(usuario.getCpf()).ifPresent(
            (user)->{
                throw new IllegalArgumentException("CPF ja existe");
            }
        );
        var password_hash = passwordEncoder.encode(usuario.getSenha_hash());
        usuario.setSenha_hash(password_hash);
        return this.usuarioRepository.save(usuario);
    }
}
