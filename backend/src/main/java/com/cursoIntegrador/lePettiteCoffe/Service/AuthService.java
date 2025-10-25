package com.cursoIntegrador.lePettiteCoffe.Service;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.AccountLoginDTO;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Cuenta;
import com.cursoIntegrador.lePettiteCoffe.Security.JwtUtil;
import com.cursoIntegrador.lePettiteCoffe.Service.DAO.AccountService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private final JwtUtil jwtUtil;
    @Autowired
    private final AccountService accountService;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    private final Set<String> invalidatedTokens = ConcurrentHashMap.newKeySet();

    public Map<String, Object> login(String username, String password) {
        Cuenta user = accountService.findByEmail(username);
        if (this.userExists(username) && passwordEncoder.matches(password, user.getPassword())) {
            Map<String, Object> respuesta = new ConcurrentHashMap<>();
            String token = jwtUtil.generateToken(user.getEmail());
            Cuenta cuenta = accountService.findByEmail(username);
            respuesta.put("loginData", new AccountLoginDTO(cuenta, token));
            return respuesta;
        }
        throw new RuntimeException("Credenciales inválidas");
    }

    public String extractUsername(String token) {
        return jwtUtil.validateAndGetUser(token);
    }

    public void register(String email, String password) {
        if (this.userExists(email)) {
            throw new RuntimeException("El usuario ya está registrado");
        }
        String encriptada = passwordEncoder.encode(password);

        Cuenta newUser = new Cuenta();
        newUser.setEmail(email);
        newUser.setPassword(encriptada);
        accountService.save(newUser);
    }

    public boolean userExists(String username) {
        return accountService.findByEmail(username) != null;
    }

    public void invalidateToken(String token) {
        invalidatedTokens.add(token);
    }

    public boolean isTokenValid(String token) {
        return !invalidatedTokens.contains(token);
    }

    public void actualizarPassword(String email, String newPassword) {
        Cuenta user = accountService.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Usuario no encontrado");
        }
        String encriptada = passwordEncoder.encode(newPassword);
        accountService.updatePassword(email, encriptada);
    }

}
