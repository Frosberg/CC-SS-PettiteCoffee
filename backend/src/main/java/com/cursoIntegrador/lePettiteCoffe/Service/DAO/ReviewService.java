package com.cursoIntegrador.lePettiteCoffe.Service.DAO;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.ReviewDTO;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Cuenta;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Reviews;
import com.cursoIntegrador.lePettiteCoffe.Repository.AccountRepository;
import com.cursoIntegrador.lePettiteCoffe.Repository.ReviewsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {

    @Autowired
    private final ReviewsRepository reviewRepo;

    @Autowired
    private final AccountRepository accountRepository;

    public List<ReviewDTO> getAllReviews() {
        List<Reviews> original = reviewRepo.findAll();
        List<ReviewDTO> dtoList = new ArrayList<>();

        for (Reviews reviewDTO : original) {
            ReviewDTO element = new ReviewDTO(reviewDTO);
            dtoList.add(element);
        }

        return dtoList;
    }

    public ReviewDTO saveReviewGuest(Reviews review) {
        review.setCuenta(null);
        review.setVerified(false);
        reviewRepo.save(review);

        ReviewDTO reviewDTO = new ReviewDTO(review);
        return reviewDTO;
    }

    public ReviewDTO saveReviewUser(Reviews review, @AuthenticationPrincipal UserDetails userDetails) {
        Cuenta cuenta = accountRepository.findByEmail(userDetails.getUsername());
        review.setCuenta(cuenta);
        review.setEmail(cuenta.getEmail());
        review.setNombre(cuenta.getAlias());
        review.setVerified(true);
        reviewRepo.save(review);

        ReviewDTO reviewDTO = new ReviewDTO(review);
        return reviewDTO;
    }

}
