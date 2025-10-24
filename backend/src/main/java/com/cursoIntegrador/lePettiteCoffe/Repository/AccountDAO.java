package com.cursoIntegrador.lePettiteCoffe.Repository;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.cursoIntegrador.lePettiteCoffe.Model.DAO.IUserDAO;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.User;

@Repository
public class AccountDAO implements IUserDAO {
    private final JdbcTemplate jdbcTemplate;

    public AccountDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public User findByUsername(String username) {
        String sql = "SELECT * FROM obtener_datos_usuario_por_email(?)";

        try {
            return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
                User user = new User(
                        rs.getString("email_cuenta"),
                        rs.getString("contrasena"));
                return user;
            }, username);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public void save(User user) {
        String sql = "CALL sp_crear_nueva_cuenta(?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                user.getUsername(),
                user.getPassword(),
                "CLIENTE",
                "ACTIVO");
    }

    @Override
    public void updatePassword(String email, String nuevaPassword) {
        String sql = "UPDATE Cuenta SET Password = ? WHERE Email = ?";
        jdbcTemplate.update(sql, nuevaPassword, email);
    }
}
