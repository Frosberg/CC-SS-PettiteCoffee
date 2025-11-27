package com.cursoIntegrador.lePettiteCoffe.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.ReviewDTO;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Reviews;
import com.cursoIntegrador.lePettiteCoffe.Model.Security.CustomUserDetails;
import com.cursoIntegrador.lePettiteCoffe.Service.DAO.ReviewService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    final ReviewService reviewService;

    @PostMapping("/addReviewGuest")
    public ResponseEntity<?> addReviewGuest(@RequestBody Reviews review) {

        logger.info("Intento de agregar reseña como invitado de: {}", review.getEmail());

        try {
            ReviewDTO newReview = reviewService.saveReviewGuest(review);
            logger.info("Review de invitado agregado por : {}", review.getEmail());
            return ResponseEntity.ok(newReview);
        } catch (RuntimeException e) {
            logger.error("Error al agregar reseña de invitado: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Error al agregar reseña");
        }

    }

    @PostMapping("/addReview")
    public ResponseEntity<?> addReview(@RequestBody Reviews review,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        logger.info("Intento de agregar reseña de: {}", review.getEmail());

        try {
            ReviewDTO newReview = reviewService.saveReviewUser(review, userDetails);
            logger.info("Review agregado por : {}", review.getEmail());
            return ResponseEntity.ok(newReview);
        } catch (RuntimeException e) {
            logger.error("Error al agregar reseña : {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Error al agregar reseña");
        }

    }

    @GetMapping("/getReviews")
    public ResponseEntity<?> getAllReviews() {
        logger.info("Intento de solicitar lista de reviews");

        try {

            List<ReviewDTO> reviews = reviewService.getAllReviews();
            logger.info("Todas las reviews obtenidas");
            return ResponseEntity.ok(reviews);

        } catch (RuntimeException e) {

            logger.error("Error al listar reviews: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(null);

        }

    }

}
