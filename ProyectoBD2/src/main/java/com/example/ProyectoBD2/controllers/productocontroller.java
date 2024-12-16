package com.example.ProyectoBD2.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.ProyectoBD2.entities.productos;
import com.example.ProyectoBD2.services.productoservice;

@RestController
@RequestMapping("/productos")
public class productocontroller {
 
    @Autowired
    private productoservice productoservice;

    // Listar todos los productos
    @GetMapping
    public List<productos> listarproductos() {
        return productoservice.listartodos();
    }

    // Guardar un nuevo producto
@PostMapping
public ResponseEntity<productos> crearProducto(@RequestBody productos nuevoProducto) {
    productos productoGuardado = productoservice.guardar(nuevoProducto);
    return ResponseEntity.ok(productoGuardado);
}


    // Obtener producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<productos> obtenerProducto(@PathVariable String id) {
        return productoservice.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Eliminar producto por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable String id) {
        if (productoservice.obtenerPorId(id).isPresent()) {
            productoservice.Eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Actualizar producto por ID
    @PutMapping("/{id}")
    public ResponseEntity<productos> actualizarProducto(@PathVariable String id, @RequestBody productos productoActualizado) {
        return productoservice.obtenerPorId(id).map(producto -> {
            // Actualizar los campos del producto
            if (productoActualizado.getNombre() != null) {
                producto.setNombre(productoActualizado.getNombre());
            }
            if (productoActualizado.getCategoria() != null) {
                producto.setCategoria(productoActualizado.getCategoria());
            }
            if (productoActualizado.getPrecio() != null) {
                producto.setPrecio(productoActualizado.getPrecio());
            }
            if (productoActualizado.getStock() != null) {
                producto.setStock(productoActualizado.getStock());
            }
            if (productoActualizado.getCantidad() != null) {
                producto.setCantidad(productoActualizado.getCantidad());
            }
            
            

            // Guardar el producto actualizado
            productoservice.guardar(producto);
            return ResponseEntity.ok(producto);
        }).orElse(ResponseEntity.notFound().build());
    }
}
