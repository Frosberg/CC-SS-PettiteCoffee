package com.cursoIntegrador.lePettiteCoffe.Model.DTO;

import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Reviews;

import lombok.Data;

@Data
public class ReviewDTO {

    private Long idReview;

    private String nombre;

    private String email;

    private String cuerpo;

    private Integer puntuacion;

    private boolean verified;

    public ReviewDTO(Reviews review) {
        this.idReview = review.getIdReview();
        this.nombre = review.getNombre();
        this.email = review.getEmail();
        this.cuerpo = review.getCuerpo();
        this.puntuacion = review.getPuntuacion();
        this.verified = review.isVerified();
    }

}
