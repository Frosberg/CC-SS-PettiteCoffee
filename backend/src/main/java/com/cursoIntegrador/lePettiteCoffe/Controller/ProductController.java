package com.cursoIntegrador.lePettiteCoffe.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.ProductDTO;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Product;
import com.cursoIntegrador.lePettiteCoffe.Service.DAO.ProductService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private final ProductService productService;

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<ProductDTO>> getAllProductsWithImage(HttpServletRequest request) {

        String baseUrl = String.format("%s://%s:%d/images/productos/", request.getScheme(), request.getServerName(),
                request.getServerPort());
        List<Product> products = productService.getAllProducts();
        List<ProductDTO> productsDTO = new java.util.ArrayList<>();

        for (Product product : products) {
            ProductDTO productDTO = new ProductDTO(product);
            String imageUrl = baseUrl + product.getCodproducto() + ".webp";
            productDTO.setImageUrl(imageUrl);
            productsDTO.add(productDTO);
        }

        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(productsDTO);
    }

}
