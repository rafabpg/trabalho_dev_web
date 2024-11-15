package com.example.trabalho_02.modules.user.repository;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.trabalho_02.modules.user.model.User;
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByCpf(String cpf);
}
