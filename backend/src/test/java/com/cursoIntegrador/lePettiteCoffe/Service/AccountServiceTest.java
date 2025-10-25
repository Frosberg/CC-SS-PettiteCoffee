package com.cursoIntegrador.lePettiteCoffe.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Cuenta;
import com.cursoIntegrador.lePettiteCoffe.Repository.AccountRepository;
import com.cursoIntegrador.lePettiteCoffe.Service.DAO.AccountService;

public class AccountServiceTest {

    @Test
    void testSaveValoresPorDefecto() {
        AccountRepository mockRepo = Mockito.mock(AccountRepository.class);
        AccountService service = new AccountService(mockRepo);

        Cuenta user = new Cuenta();
        service.save(user);

        assertEquals("ACTIVO", user.getEstado());
        assertEquals("CLIENTE", user.getRol());
        assertNotNull(user.getFechaRegistro());

        Mockito.verify(mockRepo).save(user);
    }

    @Test
    void testUpdatePasswordSuccess() {
        AccountRepository mockRepo = Mockito.mock(AccountRepository.class);
        Cuenta cuenta = new Cuenta();
        Mockito.when(mockRepo.findByEmail("usuario@prueba.com")).thenReturn(cuenta);

        AccountService service = new AccountService(mockRepo);
        service.updatePassword("usuario@prueba.com", "nuevaPass");

        assertEquals("nuevaPass", cuenta.getPassword());
        Mockito.verify(mockRepo).save(cuenta);
    }

    @Test
    void testUpdatePasswordUsuarioNoEncontrado() {
        AccountRepository mockRepo = Mockito.mock(AccountRepository.class);
        Mockito.when(mockRepo.findByEmail("noExiste@correo.com")).thenReturn(null);

        AccountService service = new AccountService(mockRepo);
        service.updatePassword("noExiste@correo.com", "nuevaPass");

        Mockito.verify(mockRepo, Mockito.never()).save(Mockito.any());
    }

}
