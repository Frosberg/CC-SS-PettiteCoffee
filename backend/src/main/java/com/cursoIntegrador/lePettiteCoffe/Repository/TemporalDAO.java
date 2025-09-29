package com.cursoIntegrador.lePettiteCoffe.Repository;

import java.util.HashMap;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.cursoIntegrador.lePettiteCoffe.Model.IUserDAO;
import com.cursoIntegrador.lePettiteCoffe.Model.User;

@Repository
public class TemporalDAO implements IUserDAO {
    private final Map<String, User> users = new HashMap<>();
    private final JdbcTemplate jdbcTemplate;

    public TemporalDAO(PasswordEncoder passwordEncoder, JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
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

        // Borrar si no se quiere usar la BD
        String sql = """
                    INSERT INTO Cuenta (Email, Password, Rol, Estado, FechaRegistro)
                    VALUES (?, ?, ?, ?, NOW())
                """;
        jdbcTemplate.update(sql,
                user.getUsername(),
                user.getPassword(),
                "CLIENTE",
                "ACTIVO");
    }
}
