package com.cursoIntegrador.lePettiteCoffe.Model.DTO.Product;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Product;

import lombok.Data;

@Data
public class ProductDTO {
    private Integer id;
    private String codproducto;
    private String nombre;
    private String categoria;
    private Integer stock;
    private BigDecimal precioventa;
    private LocalDateTime fechavencimiento;
    private String imageUrl;

    public ProductDTO(Product product) {
        this.id = product.getIdproducto();
        this.codproducto = product.getCodproducto();
        this.nombre = product.getNombre();
        this.categoria = product.getCategoria();
        this.stock = product.getStock();
        this.precioventa = product.getPrecioventa();
        this.fechavencimiento = product.getFechavencimiento();
    }
}
