package com.cursoIntegrador.lePettiteCoffe.Service.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Branch;
import com.cursoIntegrador.lePettiteCoffe.Repository.BranchRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BranchService {
    @Autowired
    private final BranchRepository branchrepo;

    public List<Branch> listarSucursales() {
        return branchrepo.findAll();
    }

    public Branch guardarSucursal(Branch branch) {
        return branchrepo.save(branch);
    }
}
