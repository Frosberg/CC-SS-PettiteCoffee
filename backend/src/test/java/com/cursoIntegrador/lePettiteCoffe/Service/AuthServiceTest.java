package com.cursoIntegrador.lePettiteCoffe.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cursoIntegrador.lePettiteCoffe.Model.DAO.IUserDAO;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.User;
import com.cursoIntegrador.lePettiteCoffe.Security.JwtUtil;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private IUserDAO userDAO;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    private User mockUser;

    @BeforeEach
    void setUp() {
        mockUser = new User("usuarioPrueba", "contraseñaEncriptada");
    }

    @Test
    void testLogin_Success() {
        when(userDAO.findByUsername("usuarioPrueba")).thenReturn(mockUser);
        when(passwordEncoder.matches("contraseñaSinEncriptar", "contraseñaEncriptada")).thenReturn(true);
        when(jwtUtil.generateToken("usuarioPrueba")).thenReturn("fakeToken");

        String token = authService.login("usuarioPrueba", "contraseñaSinEncriptar");

        assertEquals("fakeToken", token);
        verify(jwtUtil).generateToken("usuarioPrueba");
    }

}
