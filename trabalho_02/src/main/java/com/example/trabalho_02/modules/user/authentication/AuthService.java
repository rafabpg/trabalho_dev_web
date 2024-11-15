package com.example.trabalho_02.modules.user.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.trabalho_02.modules.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    @Value("${security.token.secret}")
    private String secret_key;

    @Autowired
    private UserRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponseDTO login(AuthDTO authUserDTO) {
        var usuario = this.usuarioRepository.findByCpf(authUserDTO.getCpf()).orElse(null);
        if(usuario == null){
            throw new RuntimeException("Login incorreto");
        }else{
            var password = this.passwordEncoder.matches(authUserDTO.getPassword(), usuario.getSenha_hash());
            if(password){
                Algorithm algorithm = Algorithm.HMAC256(secret_key);
                var token = JWT.create().withIssuer("secret").withSubject(usuario.getCpf()).sign(algorithm);
                var auth = AuthResponseDTO.builder().token(token).build();
                return auth;   
            }else{
                throw new RuntimeException("Login incorreto");
            }
        }
    }

}
