package com.example.ProyectoBD2.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.ProyectoBD2.entities.productos;

public interface productorepository extends MongoRepository <productos, String> {
    
}
