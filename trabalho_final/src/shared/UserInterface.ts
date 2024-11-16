

export interface UserProps {
    id: number,
    nome: string,
    email: string,
    cpf: string,
    telefone: string,
    senha_hash: string
}

export interface UserRegisterProps {
    nome: string,
    email: string,
    cpf: string,
    telefone: string,
    senha_hash: string
}