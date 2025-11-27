package com.cursoIntegrador.lePettiteCoffe.Model.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cuenta")
@Data
@NoArgsConstructor
public class Cuenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idcuenta")
    private Integer idcuenta;

    @Email(message = "El correo debe tener un formato válido (ejemplo@dominio.com)")
    @NotBlank(message = "El correo no puede estar vacío")
    @Column(length = 150, nullable = false, unique = true)
    private String email;

    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    @Column(length = 180, nullable = false)
    private String password;

    @Column(length = 50, nullable = false)
    private String rol;

    @Column(length = 20, nullable = false)
    private String estado;

    @Column(name = "fecharegistro")
    private LocalDateTime fechaRegistro;

    @Column(name = "alias", nullable = true)
    private String alias;

    public Cuenta(Integer idcuenta, String email, String password, String rol, String estado,
            LocalDateTime fechaRegistro) {
        this.idcuenta = idcuenta;
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.estado = estado;
        this.fechaRegistro = fechaRegistro;
        this.alias = "Nameless User";
    }

}
