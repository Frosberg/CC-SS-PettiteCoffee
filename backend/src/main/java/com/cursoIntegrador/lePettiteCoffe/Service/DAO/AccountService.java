package com.cursoIntegrador.lePettiteCoffe.Service.DAO;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Cuenta;
import com.cursoIntegrador.lePettiteCoffe.Repository.AccountRepository;

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
}
