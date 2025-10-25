package com.cursoIntegrador.lePettiteCoffe.Model.Entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "producto")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idproducto;
    private String codproducto;
    private String nombre;
    private String categoria;
    private Integer stock;
    private BigDecimal preciocompra;
    private BigDecimal precioventa;
    private LocalDateTime fechaVencimiento;

}
