package com.example.ProyectoBD2.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ProyectoBD2.entities.productos;
import com.example.ProyectoBD2.repositories.productorepository;

@Service
public class productoservice {

    @Autowired
    private productorepository productorepository;

    public List<productos> listartodos() {

        return productorepository.findAll();

    }

    public productos guardar(productos productos) {

        return productorepository.save(productos);

    }

    public Optional<productos> obtenerPorId(String id) {

        return productorepository.findById(id);

    }

    public void Eliminar(String id) {

        productorepository.deleteById(id);

    }

}
