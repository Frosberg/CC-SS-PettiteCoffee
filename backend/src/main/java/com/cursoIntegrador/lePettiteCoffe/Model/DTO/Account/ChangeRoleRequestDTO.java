package com.cursoIntegrador.lePettiteCoffe.Model.DTO.Account;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChangeRoleRequestDTO {

    private Integer idcuenta;
    private String rol;
}
