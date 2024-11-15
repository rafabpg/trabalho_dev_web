package com.example.trabalho_02.modules.user.model;


import java.util.UUID;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CPF;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity(name="usuario")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true)
    @CPF(message = "O CPF deve ser válido.")
    private String cpf;

    @NotBlank(message = "O nome da categoria não pode ser vazio.")
    @Length(min = 3, max = 50, message = "O nome da categoria deve ter entre 3 e 50 caracteres.")
    private String nome;

    @Email(message = "O email deve ser válido.")
    @NotBlank(message = "O email não pode ser vazio.")
    @Length(min = 3, max = 50, message = "O email deve ter entre 3 e 50 caracteres.")
    private String email;

    @NotBlank(message = "O telefone não pode ser vazio.")
    @Length(min = 10, max = 11, message = "O telefone deve ter entre 10 e 11 caracteres.")
    private String telefone;

    @NotBlank(message = "A senha não pode ser vazia.")
    private String senha_hash;
}