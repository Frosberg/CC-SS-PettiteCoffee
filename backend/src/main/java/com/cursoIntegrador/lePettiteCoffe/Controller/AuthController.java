package com.cursoIntegrador.lePettiteCoffe.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cursoIntegrador.lePettiteCoffe.Model.LoginRequest;
import com.cursoIntegrador.lePettiteCoffe.Model.PasswordChangeRequest;
import com.cursoIntegrador.lePettiteCoffe.Security.AuthService;
import com.cursoIntegrador.lePettiteCoffe.Security.PasswordRecoveryService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordRecoveryService passwordRecoveryService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            return ResponseEntity.ok(generateTokenResponse(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @GetMapping("/protectedTest")
    public ResponseEntity<?> protectedTest(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String username = authService.extractUsername(token);

            if (!authService.isTokenValid(token)) {
                return ResponseEntity.status(401).body("Token inválido o cerrado sesión");
            }

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
    public ResponseEntity<?> register(@RequestBody LoginRequest loginRequest) {
        try {
            authService.register(loginRequest.getUsername(), loginRequest.getPassword());
            Map<String, String> response = generateTokenResponse(loginRequest.getUsername(),
                    loginRequest.getPassword());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            authService.invalidateToken(token);
            return ResponseEntity.ok("Token invalidado, funcionó el logout");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body("Error al hacer logout");
        }
    }

    private Map<String, String> generateTokenResponse(String username, String password) {
        String token = authService.login(username, password);
        return Map.of(
                "token", token,
                "username", username);
    }

    @PostMapping("/recuperar")
    public ResponseEntity<String> enviarToken(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        try {
            passwordRecoveryService.generarYEnviarToken(email);
            return ResponseEntity.ok("Se envió un token de recuperación al correo " + email);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al enviar token: " + e.getMessage());
        }
    }

    @PostMapping("/cambiar-password")
    public ResponseEntity<Map<String, Object>> cambiarPassword(@RequestBody PasswordChangeRequest request) {
        Map<String, Object> respuesta = new HashMap<>();

        boolean valido = passwordRecoveryService.validarToken(request.getEmail(), request.getToken());

        if (!valido) {
            respuesta.put("valido", false);
            respuesta.put("mensaje", "Token inválido o expirado, no se cambió la contraseña");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(respuesta);
        }

        try {
            authService.actualizarPassword(request.getEmail(), request.getNuevaPassword());
            passwordRecoveryService.invalidarToken(request.getEmail());

            respuesta.put("valido", true);
            respuesta.put("mensaje", "Contraseña actualizada correctamente");
            return ResponseEntity.ok(respuesta);

        } catch (Exception e) {
            respuesta.put("valido", false);
            respuesta.put("mensaje", "Error al cambiar la contraseña: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(respuesta);
        }
    }
}
