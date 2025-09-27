package com.cursoIntegrador.lePettiteCoffe.Repository;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.cursoIntegrador.lePettiteCoffe.Model.IUserDAO;
import com.cursoIntegrador.lePettiteCoffe.Model.User;

@Repository
public class TemporalDAO implements IUserDAO {
    private final Map<String, User> users = new HashMap<>();

    public TemporalDAO() {
        users.put("admin", new User("admin", "1234"));
        users.put("user", new User("user", "abcd"));
    }

    @Override
    public User findByUsername(String username) {
        return users.get(username);
    }
}
