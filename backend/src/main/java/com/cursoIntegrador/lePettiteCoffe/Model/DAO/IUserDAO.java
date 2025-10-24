package com.cursoIntegrador.lePettiteCoffe.Model.DAO;

import com.cursoIntegrador.lePettiteCoffe.Model.Entity.User;

public interface IUserDAO {
    User findByUsername(String username);

    void save(User user);

    void updatePassword(String email, String nuevaPassword);
}
