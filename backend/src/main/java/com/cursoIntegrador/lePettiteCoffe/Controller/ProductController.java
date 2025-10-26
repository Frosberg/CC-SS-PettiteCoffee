package com.cursoIntegrador.lePettiteCoffe.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.ProductDTO;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Product;
import com.cursoIntegrador.lePettiteCoffe.Service.DAO.ProductService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private final ProductService productService;

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<ProductDTO>> getAllProductsWithImage(HttpServletRequest request) {

        String baseUrl = String.format("%s://%s:%d/images/productos/", request.getScheme(), request.getServerName(),
                request.getServerPort());

        logger.info("Solicitud para obtener todos los productos desde {}", baseUrl);

        try {
            List<Product> products = productService.getAllProducts();
            List<ProductDTO> productsDTO = new java.util.ArrayList<>();

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

}
