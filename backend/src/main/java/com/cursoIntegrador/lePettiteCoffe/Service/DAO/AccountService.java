package com.cursoIntegrador.lePettiteCoffe.Service.DAO;

import java.io.ByteArrayInputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.AccountListDTO;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Cuenta;
import com.cursoIntegrador.lePettiteCoffe.Repository.AccountRepository;
import com.cursoIntegrador.lePettiteCoffe.Util.ExcelGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {

    @Autowired
    private final AccountRepository accountRepository;

    public Cuenta findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    public void save(Cuenta user) {
        user.setEstado("ACTIVO");
        user.setRol("CLIENTE");
        user.setFechaRegistro(LocalDateTime.now());
        accountRepository.save(user);
    }

    public void updatePassword(String email, String nuevaPassword) {
        Cuenta cuenta = accountRepository.findByEmail(email);
        if (cuenta != null) {
            cuenta.setPassword(nuevaPassword);
            accountRepository.save(cuenta);
        }
    }

    public List<AccountListDTO> listarUsuarios() {
        List<Cuenta> cuentas = accountRepository.findAll();
        List<AccountListDTO> cuentasDTO = new ArrayList<>();

        for (Cuenta element : cuentas) {
            AccountListDTO elementDTO = new AccountListDTO(element);
            cuentasDTO.add(elementDTO);
        }

        return cuentasDTO;
    }

    public ByteArrayInputStream exportarExcel() throws IOException {
        List<AccountListDTO> cuentas = this.listarUsuarios();
        return ExcelGenerator.generateExcel(cuentas, "Cuentas");
    }

}
