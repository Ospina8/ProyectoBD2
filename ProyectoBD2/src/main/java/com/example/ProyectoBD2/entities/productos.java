package com.example.ProyectoBD2.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "productos")
public class productos {
    
@Id
private String id;

private String nombre;
private String categoria;
private Long precio;
private Integer Stock;
private Integer Cantidad;

public String getId() {
    return id;
}
public void setId(String id) {
    this.id = id;
}
public String getNombre() {
    return nombre;
}
public void setNombre(String nombre) {
    this.nombre = nombre;
}
public String getCategoria() {
    return categoria;
}
public void setCategoria(String categoria) {
    this.categoria = categoria;
}
public Long getPrecio() {
    return precio;
}
public void setPrecio(Long precio) {
    this.precio = precio;
}
public Integer getStock() {
    return Stock;
}
public void setStock(Integer stock) {
    Stock = stock;
}
public Integer getCantidad() {
    return Cantidad;
}
public void setCantidad(Integer cantidad) {
    Cantidad = cantidad;
}

}
