package com.cursoIntegrador.lePettiteCoffe.Model.DTO;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AccountUpdateDTO {
    private String alias;
    private String direccion;
    private String pais;
    private LocalDate fechaNacimiento;
}