package com.cursoIntegrador.lePettiteCoffe.Security;

import org.springframework.stereotype.Service;

import com.cursoIntegrador.lePettiteCoffe.Model.IUserDAO;
import com.cursoIntegrador.lePettiteCoffe.Model.User;

@Service
public class AuthService {
    private final JwtUtil jwtUtil;
    private final IUserDAO userDAO;

    public AuthService(JwtUtil jwtUtil, IUserDAO userDAO) {
        this.jwtUtil = jwtUtil;
        this.userDAO = userDAO;
    }

    public String login(String username, String password) {
        User user = userDAO.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return jwtUtil.generateToken(user.getUsername());
        }
        throw new RuntimeException("Credenciales invaálidas");
    }

    public String extractUsername(String token) {
        return jwtUtil.validateAndGetUser(token);
    }
}
