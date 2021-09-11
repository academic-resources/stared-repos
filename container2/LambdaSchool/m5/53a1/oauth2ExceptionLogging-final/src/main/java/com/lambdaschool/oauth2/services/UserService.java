package com.lambdaschool.oauth2.services;

import com.lambdaschool.oauth2.logging.Loggable;
import com.lambdaschool.oauth2.models.User;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@Loggable
public interface UserService
{
    UserDetails loadUserByUsername(String username);

    List<User> findAll();

    List<User> findByNameContaining(String username);

    User findUserById(long id);

    User findByName(String name);

    void delete(long id);

    User save(User user);

    User update(User user,
                long id,
                boolean isAdmin);

    void deleteUserRole(long userid,
                        long roleid);

    void addUserRole(long userid,
                     long roleid);
}