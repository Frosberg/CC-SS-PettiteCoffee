package com.cursoIntegrador.lePettiteCoffe.Model.DTO;

import java.time.LocalDateTime;

import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Cuenta;

import lombok.Data;

@Data
public class AccountListDTO {

    private Integer idcuenta;
    private String email;
    private String rol;
    private String estado;
    private LocalDateTime fechaRegistro;

    public AccountListDTO(Cuenta cuenta) {
        this.idcuenta = cuenta.getIdcuenta();
        this.email = cuenta.getEmail();
        this.rol = cuenta.getRol();
        this.estado = cuenta.getEstado();
        this.fechaRegistro = cuenta.getFechaRegistro();
    }

}
