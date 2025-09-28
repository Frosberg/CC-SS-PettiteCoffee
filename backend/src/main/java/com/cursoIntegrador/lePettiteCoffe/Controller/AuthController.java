package com.cursoIntegrador.lePettiteCoffe.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cursoIntegrador.lePettiteCoffe.Model.LoginRequest;
import com.cursoIntegrador.lePettiteCoffe.Security.AuthService;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            String token = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @GetMapping("/protectedTest")
    public ResponseEntity<?> protectedTest(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String username = authService.extractUsername(token);
            if (authService.userExists(username)) {
                return ResponseEntity.ok("USUARIO : " + username + " ENTRO AL ENDPOINT PROTEGIDO");
            } else {
                return ResponseEntity.status(401).body("Usuario no existe o fue eliminado");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body("Token inválido o expirado");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> getMethodName(@RequestBody LoginRequest loginRequest) {
        try {
            authService.register(loginRequest.getUsername(), loginRequest.getPassword());
            return ResponseEntity.ok("Usuario registrado exitosamente");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

}
