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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.Account.AccountLoginDTO;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Cuenta;
import com.cursoIntegrador.lePettiteCoffe.Security.JwtUtil;
import com.cursoIntegrador.lePettiteCoffe.Service.DAO.AccountService;

import org.junit.jupiter.api.Assertions;
import org.mockito.Mockito;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private AccountService accountService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

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
                LocalDateTime.now(),
                "1234567890");
    }

    @Test
    void testLogin_Success() {
        Authentication mockAuth = Mockito.mock(Authentication.class);
        org.springframework.security.core.userdetails.UserDetails mockUserDetails = Mockito.mock(
                org.springframework.security.core.userdetails.UserDetails.class);
        
        when(authenticationManager.authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(mockAuth);
        when(mockAuth.getPrincipal()).thenReturn(mockUserDetails);
        when(mockUserDetails.getUsername()).thenReturn("usuario@prueba.com");
        when(accountService.findByEmail("usuario@prueba.com")).thenReturn(mockUser);
        when(jwtUtil.generateToken("usuario@prueba.com")).thenReturn("fakeToken");

        Map<String, Object> result = authService.login("usuario@prueba.com", "contraseñaSinEncriptar");

        AccountLoginDTO loginData = (AccountLoginDTO) result.get("loginData");

        assertEquals("usuario@prueba.com", loginData.getEmail());
        assertEquals("fakeToken", loginData.getToken());

        verify(jwtUtil).generateToken("usuario@prueba.com");
    }

    @Test
    void testLogin_Failed_MalPassword() {
        when(authenticationManager.authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new RuntimeException("Credenciales inválidas"));

        RuntimeException thrown = Assertions.assertThrows(RuntimeException.class,
                () -> authService.login("usuario@prueba.com", "contraseñaIncorrecta"));

        assertEquals("Credenciales inválidas", thrown.getMessage());
    }

}
