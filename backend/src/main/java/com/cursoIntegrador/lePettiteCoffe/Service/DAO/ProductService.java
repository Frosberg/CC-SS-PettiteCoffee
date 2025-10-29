package com.cursoIntegrador.lePettiteCoffe.Service.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Product;
import com.cursoIntegrador.lePettiteCoffe.Repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    @Autowired
    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product guardarProducto(Product product) {
        return productRepository.save(product);
    }

    public void eliminarProductoPorId(Integer idproducto) {
        if (!productRepository.existsById(idproducto)) {
            throw new IllegalArgumentException("El producto con ID " + idproducto + " no existe");
        }
        productRepository.deleteById(idproducto);
    }

}
