package com.cursoIntegrador.lePettiteCoffe.Controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.ProductDTO;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Product;
import com.cursoIntegrador.lePettiteCoffe.Service.AuthService;
import com.cursoIntegrador.lePettiteCoffe.Service.DAO.ProductService;

import jakarta.servlet.http.HttpServletRequest;

public class ProductControllerTest {

    @Test
    void testGetAllProductsWithImage() {
        ProductService mockProductService = Mockito.mock(ProductService.class);
        AuthService mockAuthService = Mockito.mock(AuthService.class);
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);

        ProductController controller = new ProductController(mockProductService, mockAuthService);

        Product p = new Product();
        p.setCodproducto("1");
        p.setNombre("Café");

        Mockito.when(mockProductService.getAllProducts()).thenReturn(List.of(p));
        Mockito.when(request.getScheme()).thenReturn("http");
        Mockito.when(request.getServerName()).thenReturn("localhost");
        Mockito.when(request.getServerPort()).thenReturn(8080);

        ResponseEntity<List<ProductDTO>> response = controller.getAllProductsWithImage(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        assertEquals("http://localhost:8080/images/productos/1.webp", response.getBody().get(0).getImageUrl());
    }
}
