package com.cursoIntegrador.lePettiteCoffe.Repository;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.cursoIntegrador.lePettiteCoffe.Model.IUserDAO;
import com.cursoIntegrador.lePettiteCoffe.Model.User;

@Repository
public class TemporalDAO implements IUserDAO {
    private final Map<String, User> users = new HashMap<>();

    public TemporalDAO(PasswordEncoder passwordEncoder) {
        users.put("admin", new User("admin", passwordEncoder.encode("1234")));
        users.put("user", new User("user", passwordEncoder.encode("abcd")));
    }

    @Override
    public User findByUsername(String username) {
        return users.get(username);
    }

    @Override
    public void save(User user) {
        users.put(user.getUsername(), user);
    }
}
