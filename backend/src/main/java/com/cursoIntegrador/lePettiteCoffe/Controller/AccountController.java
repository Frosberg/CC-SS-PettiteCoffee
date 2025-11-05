package com.cursoIntegrador.lePettiteCoffe.Controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpHeaders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.AccountListDTO;
import com.cursoIntegrador.lePettiteCoffe.Service.AuthService;
import com.cursoIntegrador.lePettiteCoffe.Service.DAO.AccountService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {

    @Autowired
    private final AccountService accountService;

    @Autowired
    private final AuthService authService;

    @GetMapping("/export")
    public ResponseEntity<?> exportarExcel(@RequestHeader("Authorization") String authHeader) throws IOException {
        try {
            String token = authHeader.replace("Bearer ", "");

            if (!authService.validateTokenAndRole(token, "ADMIN")) {
                return ResponseEntity.status(403).body("No tienes permisos para exportar un excel de usuarios.");
            }

            ByteArrayInputStream excelStream = accountService.exportarExcel();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=cuentas.xlsx");

            return ResponseEntity.ok().headers(headers)
                    .contentType(MediaType
                            .parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .body(new InputStreamResource(excelStream));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error al generar el archivo Excel: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<?> listarUsuarios(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            if (!authService.validateTokenAndRole(token, "ADMIN")) {
                return ResponseEntity.status(403).body("No tienes permisos para ver las cuentas.");
            }

            List<AccountListDTO> cuentas = accountService.listarUsuarios();

            if (cuentas.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.ok(cuentas);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error al obtener las cuentas: " + e.getMessage());
        }
    }

}
