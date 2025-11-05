package com.cursoIntegrador.lePettiteCoffe.Model.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordChangeRequest {
    private String email;
    private String token;
    private String nuevaPassword;
}
