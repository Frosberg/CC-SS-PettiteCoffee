package com.cursoIntegrador.lePettiteCoffe.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.ProductDTO;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Product;
import com.cursoIntegrador.lePettiteCoffe.Service.AuthService;
import com.cursoIntegrador.lePettiteCoffe.Service.DAO.ProductService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private final ProductService productService;

    @Autowired
    private final AuthService authService;

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<ProductDTO>> getAllProductsWithImage(HttpServletRequest request) {

        String baseUrl = String.format("%s://%s:%d/images/productos/", request.getScheme(), request.getServerName(),
                request.getServerPort());

        logger.info("Solicitud para obtener todos los productos desde {}", baseUrl);

        try {
            List<Product> products = productService.getAllProducts();
            List<ProductDTO> productsDTO = new ArrayList<>();

            if (products.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            for (Product product : products) {
                ProductDTO productDTO = new ProductDTO(product);
                String imageUrl = baseUrl + product.getCodproducto() + ".webp";
                productDTO.setImageUrl(imageUrl);
                productsDTO.add(productDTO);
            }

            return ResponseEntity.ok(productsDTO);
        } catch (Exception e) {
            logger.error("Error al obtener productos - {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @PostMapping("/agregar")
    public ResponseEntity<?> agregarProducto(@RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody Product product) {

        logger.info("Intento de agregar producto: {}", product.getNombre());

        try {
            String token = authHeader.replace("Bearer ", "");

            if (!authService.isTokenValid(token)) {
                return ResponseEntity.status(401).body("Token inválido o expirado");
            }

            String username = authService.extractUsername(token);

            if (!authService.userHasRole(username, "ADMIN")) {
                logger.warn("Usuario {} sin permisos para agregar productos", username);
                return ResponseEntity.status(403).body("No tienes permisos para esta acción");
            }

            Product nuevo = productService.guardarProducto(product);
            logger.info("Producto agregado por ADMIN {}: {}", username, nuevo.getNombre());

            return ResponseEntity.ok(nuevo);

        } catch (RuntimeException e) {
            logger.error("Error al agregar producto: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Error al agregar producto");
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarProducto(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Integer id) {

        logger.info("Intento de eliminar producto con ID: {}", id);

        try {
            String token = authHeader.replace("Bearer ", "");

            if (!authService.isTokenValid(token)) {
                return ResponseEntity.status(401).body("Token inválido o expirado");
            }

            String username = authService.extractUsername(token);

            if (!authService.userHasRole(username, "ADMIN")) {
                logger.warn("Usuario {} sin permisos para eliminar productos", username);
                return ResponseEntity.status(403).body("No tienes permisos para esta acción");
            }

            productService.eliminarProductoPorId(id);
            logger.info("Producto con ID {} eliminado por admin {}", id, username);

            return ResponseEntity.ok("Producto eliminado correctamente");

        } catch (IllegalArgumentException e) {
            logger.warn("Intento de eliminar producto inexistente: {}", e.getMessage());
            return ResponseEntity.status(404).body(e.getMessage());

        } catch (Exception e) {
            logger.error("Error al eliminar producto: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Error al eliminar producto");
        }
    }

}
