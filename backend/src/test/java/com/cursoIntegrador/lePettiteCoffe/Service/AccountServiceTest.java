package com.cursoIntegrador.lePettiteCoffe.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Cuenta;
import com.cursoIntegrador.lePettiteCoffe.Repository.AccountRepository;
import com.cursoIntegrador.lePettiteCoffe.Service.DAO.AccountService;
import com.cursoIntegrador.lePettiteCoffe.Service.ReportService;

public class AccountServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private ReportService reportService;

    @InjectMocks
    private AccountService accountService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveValoresPorDefecto() {
        Cuenta user = new Cuenta();
        accountService.save(user);

        assertEquals("ACTIVO", user.getEstado());
        assertEquals("CLIENTE", user.getRol());
        assertNotNull(user.getFechaRegistro());

        org.mockito.Mockito.verify(accountRepository).save(user);
    }

    @Test
    void testUpdatePasswordSuccess() {
        Cuenta cuenta = new Cuenta();
        org.mockito.Mockito.when(accountRepository.findByEmail("usuario@prueba.com")).thenReturn(cuenta);

        accountService.updatePassword("usuario@prueba.com", "nuevaPass");

        assertEquals("nuevaPass", cuenta.getPassword());
        org.mockito.Mockito.verify(accountRepository).save(cuenta);
    }

    @Test
    void testUpdatePasswordUsuarioNoEncontrado() {
        org.mockito.Mockito.when(accountRepository.findByEmail("noExiste@correo.com")).thenReturn(null);

        accountService.updatePassword("noExiste@correo.com", "nuevaPass");

        org.mockito.Mockito.verify(accountRepository, org.mockito.Mockito.never()).save(org.mockito.Mockito.any());
    }

}

