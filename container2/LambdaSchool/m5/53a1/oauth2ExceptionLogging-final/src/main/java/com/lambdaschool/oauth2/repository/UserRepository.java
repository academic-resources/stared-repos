package com.lambdaschool.oauth2.repository;

import com.lambdaschool.oauth2.logging.Loggable;
import com.lambdaschool.oauth2.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long>
{
    User findByUsername(String username);

    List<User> findByUsernameContainingIgnoreCase(String name);
}
