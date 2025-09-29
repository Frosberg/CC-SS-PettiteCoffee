package com.cursoIntegrador.lePettiteCoffe.Model;

public interface IUserDAO {
    User findByUsername(String username);

    void save(User user);
}
