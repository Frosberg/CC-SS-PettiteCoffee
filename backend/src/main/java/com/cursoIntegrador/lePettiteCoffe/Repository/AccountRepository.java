package com.cursoIntegrador.lePettiteCoffe.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Cuenta;

@Repository
public interface AccountRepository extends JpaRepository<Cuenta, Long> {

    Cuenta findByEmail(String email);

    Cuenta findByEmailAndPassword(String email, String password);

}
