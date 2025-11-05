package com.cursoIntegrador.lePettiteCoffe.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.NotificationDTO;
import com.cursoIntegrador.lePettiteCoffe.Service.AuthService;
import com.cursoIntegrador.lePettiteCoffe.Service.DAO.NotificationService;

@RequestMapping("/notificaciones")
@RestController
public class NotificationController {

    private static final Logger logger = LoggerFactory.getLogger(NotificationController.class);

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private AuthService authService;

    @GetMapping("/listar")
    public ResponseEntity<?> listarNotificaciones(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");

            if (!authService.isTokenValid(token)) {
                return ResponseEntity.status(401).body("Token inválido o expirado");
            }

            String email = authService.extractUsername(token);
            logger.info("Buscando notificaciones del email: {}", email);
            List<NotificationDTO> notificaciones = notificationService.getAllUserNotis(email);
            logger.info("Notificaciones encontradas: {}", notificaciones.size());

            if (notificaciones.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            logger.info("Notificaciones obtenidas para {}", email);
            return ResponseEntity.ok(notificaciones);

        } catch (Exception e) {
            logger.error("Error al listar notificaciones: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Error al listar notificaciones");
        }
    }

}
