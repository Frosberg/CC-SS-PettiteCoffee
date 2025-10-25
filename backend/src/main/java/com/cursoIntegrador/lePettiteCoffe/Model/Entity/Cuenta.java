package com.cursoIntegrador.lePettiteCoffe.Model.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cuenta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cuenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idcuenta")
    private Integer idcuenta;

    @Column(length = 150, nullable = false, unique = true)
    private String email;

    @Column(length = 180, nullable = false)
    private String password;

    @Column(length = 50, nullable = false)
    private String rol;

    @Column(length = 20, nullable = false)
    private String estado;

    @Column(name = "fecharegistro")
    private LocalDateTime fechaRegistro;

}
