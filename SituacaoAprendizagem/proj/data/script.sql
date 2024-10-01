-- SQL do banco de dados de Inventários com apenas uma tabela
DROP DATABASE IF EXISTS Escola;
CREATE DATABASE Escola CHARSET=UTF8 COLLATE utf8_general_ci;
USE Escola;
-- DDL Criação da estrutura da tabela
CREATE TABLE Atividade(       
    id integer primary key auto_increment,
    nome varchar(50) not null,
    idTurma int foreign key references Turmas(id)
);

CREATE TABLE Professores(       
    id integer primary key auto_increment,
    nome varchar(100) not null,
    email varchar(50) not null,
    senha varchar(50) not null,
    idTurma int foreign key references Turmas(id)
);

CREATE TABLE Turmas(       
    id integer primary key auto_increment,
    nome varchar(50) not null,
    idProfessores int foreign key references Professores(id)
);