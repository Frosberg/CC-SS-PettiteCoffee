package com.cursoIntegrador.lePettiteCoffe.Controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.Account.AccountLoginDTO;
import com.cursoIntegrador.lePettiteCoffe.Model.DTO.Login.LoginRequest;
import com.cursoIntegrador.lePettiteCoffe.Service.WelcomeService;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Cuenta;
import com.cursoIntegrador.lePettiteCoffe.Service.AuthService;
import com.cursoIntegrador.lePettiteCoffe.Service.PasswordRecoveryService;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {

    @InjectMocks
    private AuthController controller;

    @Mock
    private AuthService authService;

    @Mock
    private PasswordRecoveryService passwordRecoveryService;

    @Mock
    private WelcomeService welcomeService;

    @Test
    void testLoginSuccess() {
        LoginRequest request = new LoginRequest("user@test.com", "pass123");

        Map<String, Object> fakeResponse = new HashMap<>();
        fakeResponse.put("loginData", new AccountLoginDTO(
            new Cuenta(999, "user@test.com", "pass123", "ADMIN", "Activo", LocalDateTime.now(), "123456789"), "tokenFake"));

        Mockito.when(authService.login("user@test.com", "pass123")).thenReturn(fakeResponse);

        ResponseEntity<?> response = controller.login(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(fakeResponse, response.getBody());
        Mockito.verify(authService).login("user@test.com", "pass123");
    }

    @Test
    void testLoginFail_InvalidPassword() {
        LoginRequest request = new LoginRequest("user@test.com", "wrongpass");

        Mockito.when(authService.login("user@test.com", "wrongpass"))
                .thenThrow(new RuntimeException("Credenciales inválidas"));

        ResponseEntity<?> response = controller.login(request);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Credenciales inválidas", response.getBody());
        Mockito.verify(authService).login("user@test.com", "wrongpass");
    }
}

