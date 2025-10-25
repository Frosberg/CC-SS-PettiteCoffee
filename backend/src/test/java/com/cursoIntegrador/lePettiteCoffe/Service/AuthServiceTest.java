package com.cursoIntegrador.lePettiteCoffe.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.AccountLoginDTO;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Cuenta;
import com.cursoIntegrador.lePettiteCoffe.Security.JwtUtil;
import com.cursoIntegrador.lePettiteCoffe.Service.DAO.AccountService;

import org.junit.jupiter.api.Assertions;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private AccountService accountService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    private Cuenta mockUser;

    @BeforeEach
    void setUp() {
        mockUser = new Cuenta(
                1,
                "usuario@prueba.com",
                "contraseñaEncriptada",
                "USER",
                "ACTIVO",
                LocalDateTime.now());
    }

    @Test
    void testLogin_Success() {
        when(accountService.findByEmail("usuario@prueba.com")).thenReturn(mockUser);
        when(passwordEncoder.matches("contraseñaSinEncriptar", "contraseñaEncriptada")).thenReturn(true);
        when(jwtUtil.generateToken("usuario@prueba.com")).thenReturn("fakeToken");

        Map<String, Object> result = authService.login("usuario@prueba.com", "contraseñaSinEncriptar");

        AccountLoginDTO loginData = (AccountLoginDTO) result.get("loginData");

        assertEquals("usuario@prueba.com", loginData.getEmail());
        assertEquals("fakeToken", loginData.getToken());

        verify(jwtUtil).generateToken("usuario@prueba.com");
    }

    @Test
    void testLogin_Failed_MalPassword() {
        when(accountService.findByEmail("usuario@prueba.com")).thenReturn(mockUser);
        when(passwordEncoder.matches("contraseñaIncorrecta", "contraseñaEncriptada")).thenReturn(false);

        RuntimeException thrown = Assertions.assertThrows(RuntimeException.class,
                () -> authService.login("usuario@prueba.com", "contraseñaIncorrecta"));

        assertEquals("Credenciales inválidas", thrown.getMessage());
    }

}
