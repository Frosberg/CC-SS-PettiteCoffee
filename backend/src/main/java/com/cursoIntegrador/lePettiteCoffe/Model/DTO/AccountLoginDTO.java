package com.cursoIntegrador.lePettiteCoffe.Model.DTO;

import java.time.LocalDateTime;

import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Cuenta;

import lombok.Data;

@Data
public class AccountLoginDTO {

    public AccountLoginDTO(Cuenta cuenta, String token) {
        this.email = cuenta.getEmail();
        this.rol = cuenta.getRol();
        this.estado = cuenta.getEstado();
        this.fechaRegistro = cuenta.getFechaRegistro();
        this.token = token;
    }

    private String email;

    private String rol;

    private String estado;

    private LocalDateTime fechaRegistro;
    private String token;

}
