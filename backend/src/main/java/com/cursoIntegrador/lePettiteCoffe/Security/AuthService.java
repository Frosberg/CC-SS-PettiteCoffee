package com.cursoIntegrador.lePettiteCoffe.Security;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cursoIntegrador.lePettiteCoffe.Model.IUserDAO;
import com.cursoIntegrador.lePettiteCoffe.Model.User;

@Service
public class AuthService {
    private final JwtUtil jwtUtil;
    private final IUserDAO userDAO;
    private final PasswordEncoder passwordEncoder;
    private final Set<String> invalidatedTokens = ConcurrentHashMap.newKeySet();

    public AuthService(JwtUtil jwtUtil, IUserDAO userDAO, PasswordEncoder passwordEncoder) {
        this.jwtUtil = jwtUtil;
        this.userDAO = userDAO;
        this.passwordEncoder = passwordEncoder;
    }

    public String login(String username, String password) {
        User user = userDAO.findByUsername(username);
        if (this.userExists(username) && passwordEncoder.matches(password, user.getPassword())) {
            return jwtUtil.generateToken(user.getUsername());
        }
        throw new RuntimeException("Credenciales invaálidas");
    }

    public String extractUsername(String token) {
        return jwtUtil.validateAndGetUser(token);
    }

    public void register(String username, String password) {
        if (this.userExists(username)) {
            throw new RuntimeException("El usuario ya está registrado");
        }
        String encriptada = passwordEncoder.encode(password);
        User newUser = new User(username, encriptada);
        userDAO.save(newUser);
    }

    public boolean userExists(String username) {
        return userDAO.findByUsername(username) != null;
    }

    public void invalidateToken(String token) {
        invalidatedTokens.add(token);
    }

    public boolean isTokenValid(String token) {
        return !invalidatedTokens.contains(token);
    }

}
