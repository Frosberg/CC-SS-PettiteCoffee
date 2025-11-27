package com.cursoIntegrador.lePettiteCoffe.Controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Branch;
import com.cursoIntegrador.lePettiteCoffe.Service.AuthService;
import com.cursoIntegrador.lePettiteCoffe.Service.DAO.BranchService;

@ExtendWith(MockitoExtension.class)
public class BranchControllerTest {

    @InjectMocks
    private BranchController branchController;

    @Mock
    private BranchService branchService;

    @Mock
    private AuthService authService;

    private Branch sucursalEjemplo;

    @BeforeEach
    void setUp() {
        sucursalEjemplo = new Branch();
        sucursalEjemplo.setIdsucursal(1);
        sucursalEjemplo.setNombre("Sucursal Centro");
        sucursalEjemplo.setDireccion("Av. Principal 123");
    }


    
    @Test
    void testListarSucursales_Success() {

        Branch sucursal2 = new Branch();
        sucursal2.setIdsucursal(2);
        sucursal2.setNombre("Sucursal Norte");
        sucursal2.setDireccion("Calle Norte 456");

        List<Branch> sucursales = Arrays.asList(sucursalEjemplo, sucursal2);
        Mockito.when(branchService.listarSucursales()).thenReturn(sucursales);

        ResponseEntity<List<Branch>> response = branchController.listarSucursales();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        assertEquals("Sucursal Centro", response.getBody().get(0).getNombre());
        Mockito.verify(branchService).listarSucursales();
    }

    @Test
    void testListarSucursales_ErrorInesperado() {

        Mockito.when(branchService.listarSucursales())
                .thenThrow(new RuntimeException("Error de base de datos"));


        ResponseEntity<List<Branch>> response = branchController.listarSucursales();


        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }



    @Test
    void testAgregarSucursal_ConPermisos_Success() {

        String token = "Bearer validToken123";
        Mockito.when(authService.isTokenValid("validToken123")).thenReturn(true);
        Mockito.when(authService.extractUsername("validToken123")).thenReturn("admin@test.com");
        Mockito.when(authService.userHasRole("admin@test.com", "ADMIN")).thenReturn(true);
        Mockito.when(branchService.guardarSucursal(any(Branch.class))).thenReturn(sucursalEjemplo);


        ResponseEntity<?> response = branchController.agregarSucursal(token, sucursalEjemplo);


        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(sucursalEjemplo, response.getBody());
        Mockito.verify(branchService).guardarSucursal(any(Branch.class));
    }

    @Test
    void testAgregarSucursal_TokenInvalido() {

        String token = "Bearer tokenInvalido";
        Mockito.when(authService.isTokenValid("tokenInvalido")).thenReturn(false);


        ResponseEntity<?> response = branchController.agregarSucursal(token, sucursalEjemplo);


        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Token inválido o expirado", response.getBody());
        Mockito.verify(branchService, Mockito.never()).guardarSucursal(any());
    }

    @Test
    void testAgregarSucursal_SinPermisos() {

        String token = "Bearer validTokenSinPermisos";
        Mockito.when(authService.isTokenValid("validTokenSinPermisos")).thenReturn(true);
        Mockito.when(authService.extractUsername("validTokenSinPermisos")).thenReturn("user@test.com");
        Mockito.when(authService.userHasRole("user@test.com", "ADMIN")).thenReturn(false);


        ResponseEntity<?> response = branchController.agregarSucursal(token, sucursalEjemplo);


        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        assertEquals("No tienes permisos para esta acción", response.getBody());
        Mockito.verify(branchService, Mockito.never()).guardarSucursal(any());
    }



    @Test
    void testModificarSucursal_Success() {

        String token = "Bearer validAdminToken";
        Branch sucursalActualizada = new Branch();
        sucursalActualizada.setNombre("Sucursal Centro Actualizada");

        Mockito.when(authService.validateTokenAndRole("validAdminToken", "ADMIN")).thenReturn(true);
        Mockito.when(branchService.modificarSucursalParcial(eq(1), any(Branch.class)))
                .thenReturn(sucursalEjemplo);


        ResponseEntity<?> response = branchController.modificarSucursal(token, 1, sucursalActualizada);


        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        Mockito.verify(branchService).modificarSucursalParcial(eq(1), any(Branch.class));
    }

    @Test
    void testModificarSucursal_SinPermisos() {

        String token = "Bearer tokenSinPermisos";
        Mockito.when(authService.validateTokenAndRole("tokenSinPermisos", "ADMIN")).thenReturn(false);

   
        ResponseEntity<?> response = branchController.modificarSucursal(token, 1, sucursalEjemplo);


        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        assertEquals("No tienes permisos para esta acción", response.getBody());
        Mockito.verify(branchService, Mockito.never()).modificarSucursalParcial(any(), any());
    }

    @Test
    void testModificarSucursal_NoEncontrada() {

        String token = "Bearer validAdminToken";
        Mockito.when(authService.validateTokenAndRole("validAdminToken", "ADMIN")).thenReturn(true);
        Mockito.when(branchService.modificarSucursalParcial(eq(999), any(Branch.class)))
                .thenThrow(new IllegalArgumentException("Sucursal con ID 999 no encontrada"));


        ResponseEntity<?> response = branchController.modificarSucursal(token, 999, sucursalEjemplo);


        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Sucursal con ID 999 no encontrada", response.getBody());
    }



    @Test
    void testEliminarSucursal_Success() {

        String token = "Bearer validAdminToken";
        Mockito.when(authService.validateTokenAndRole("validAdminToken", "ADMIN")).thenReturn(true);
        Mockito.doNothing().when(branchService).eliminarSucursal(1);


        ResponseEntity<?> response = branchController.eliminarSucursal(token, 1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Sucursal eliminada correctamente", response.getBody());
        Mockito.verify(branchService).eliminarSucursal(1);
    }

    @Test
    void testEliminarSucursal_SinPermisos() {

        String token = "Bearer tokenSinPermisos";
        Mockito.when(authService.validateTokenAndRole("tokenSinPermisos", "ADMIN")).thenReturn(false);

 
        ResponseEntity<?> response = branchController.eliminarSucursal(token, 1);


        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        assertEquals("No tienes permisos para esta acción", response.getBody());
        Mockito.verify(branchService, Mockito.never()).eliminarSucursal(any());
    }

    @Test
    void testEliminarSucursal_NoEncontrada() {

        String token = "Bearer validAdminToken";
        Mockito.when(authService.validateTokenAndRole("validAdminToken", "ADMIN")).thenReturn(true);
        Mockito.doThrow(new IllegalArgumentException("La sucursal con ID 999 no existe"))
                .when(branchService).eliminarSucursal(999);


        ResponseEntity<?> response = branchController.eliminarSucursal(token, 999);


        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("La sucursal con ID 999 no existe", response.getBody());
    }
}
