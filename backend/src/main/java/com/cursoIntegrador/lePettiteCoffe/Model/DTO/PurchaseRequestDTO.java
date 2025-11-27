package com.cursoIntegrador.lePettiteCoffe.Model.DTO;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class PurchaseRequestDTO {

    private BigDecimal montoProcesado;
    private List<PurchaseProductDTO> productos;
    private String cityDelivery;
    private String addressDelivery;

}
