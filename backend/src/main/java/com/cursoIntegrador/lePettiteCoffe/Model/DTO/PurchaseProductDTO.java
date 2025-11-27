package com.cursoIntegrador.lePettiteCoffe.Model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PurchaseProductDTO {
    private Integer idProducto;
    private Integer quantity;
}
