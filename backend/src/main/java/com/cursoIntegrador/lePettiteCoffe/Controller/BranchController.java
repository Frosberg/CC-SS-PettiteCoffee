package com.cursoIntegrador.lePettiteCoffe.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Branch;
import com.cursoIntegrador.lePettiteCoffe.Service.AuthService;
import com.cursoIntegrador.lePettiteCoffe.Service.DAO.BranchService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/sucursales")
public class BranchController {

    @Autowired
    private final BranchService branchService;

    @Autowired
    private final AuthService authService;

    private static final Logger logger = LoggerFactory.getLogger(BranchController.class);

    @GetMapping("/listar")
    public ResponseEntity<List<Branch>> listarSucursales() {
        logger.info("Intento de solicitar lista de sucursales");
        try {
            List<Branch> sucursales = branchService.listarSucursales();
            logger.info("Lista de sucursales obtenidos");
            return ResponseEntity.ok(sucursales);
        } catch (Exception e) {
            logger.error("Error inesperado al listar sucursales: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @PostMapping("/agregar")
    public ResponseEntity<?> agregarSucursal(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Branch branch) {

        logger.info("Intento de agregar sucursal: {}", branch.getNombre());

        try {
            String token = authHeader.replace("Bearer ", "");

            if (!authService.isTokenValid(token)) {
                return ResponseEntity.status(401).body("Token inválido o expirado");
            }

            String username = authService.extractUsername(token);
            if (!authService.userHasRole(username, "ADMIN")) {
                logger.warn("Usuario {} sin permisos para agregar sucursales", username);
                return ResponseEntity.status(403).body("No tienes permisos para esta acción");
            }
            Branch nuevaSucursal = branchService.guardarSucursal(branch);
            logger.info("Sucursal agregada por admin {}: {}", username, nuevaSucursal.getNombre());
            return ResponseEntity.ok(nuevaSucursal);

        } catch (RuntimeException e) {
            logger.error("Error al agregar sucursal: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Error al agregar sucursal");
        }
    }

    @PatchMapping("/modificar/{id}")
    public ResponseEntity<?> modificarSucursal(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Integer id,
            @RequestBody Branch branchActualizada) {

        logger.info("Intento de modificar sucursal con ID: {}", id);
        try {
            String token = authHeader.replace("Bearer ", "");

            if (!authService.validateTokenAndRole(token, "ADMIN")) {
                logger.warn("Intento no autorizado de modificar sucursal");
                return ResponseEntity.status(403).body("No tienes permisos para esta acción");
            }

            Branch modificada = branchService.modificarSucursalParcial(id, branchActualizada);
            logger.info("Sucursal con ID {} modificada correctamente", id);
            return ResponseEntity.ok(modificada);

        } catch (IllegalArgumentException e) {
            logger.warn("Sucursal con ID {} no encontrada: {}", id, e.getMessage());
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (RuntimeException e) {
            logger.error("Error al modificar sucursal: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Error al modificar sucursal");
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarSucursal(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Integer id) {

        logger.info("Intento de eliminar sucursal con ID: {}", id);
        try {
            String token = authHeader.replace("Bearer ", "");

            if (!authService.validateTokenAndRole(token, "ADMIN")) {
                logger.warn("Intento no autorizado de eliminar sucursal");
                return ResponseEntity.status(403).body("No tienes permisos para esta acción");
            }

            branchService.eliminarSucursal(id);
            logger.info("Sucursal con ID {} eliminada correctamente", id);
            return ResponseEntity.ok("Sucursal eliminada correctamente");

        } catch (IllegalArgumentException e) {
            logger.warn("Sucursal con ID {} no encontrada: {}", id, e.getMessage());
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (RuntimeException e) {
            logger.error("Error al eliminar sucursal: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Error al eliminar sucursal");
        }
    }
}
