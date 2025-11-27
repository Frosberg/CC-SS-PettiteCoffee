package com.cursoIntegrador.lePettiteCoffe.Model.DTO;

import java.math.BigDecimal;

import com.cursoIntegrador.lePettiteCoffe.Model.Entity.PurchaseDetails;

import lombok.Data;

@Data
public class PurchaseHistoryDetailDTO {
    private Integer productId;
    private String productName;
    private Integer quantity;
    private BigDecimal price;

    public PurchaseHistoryDetailDTO(PurchaseDetails purchaseDetail) {
        this.productId = purchaseDetail.getProduct().getIdproducto();
        this.productName = purchaseDetail.getProduct().getNombre();
        this.quantity = purchaseDetail.getQuantity();
        this.price = purchaseDetail.getProduct().getPrecioventa();
    }

}
