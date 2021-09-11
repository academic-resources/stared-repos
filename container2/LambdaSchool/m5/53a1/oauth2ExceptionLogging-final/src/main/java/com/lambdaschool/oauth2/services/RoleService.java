package com.lambdaschool.oauth2.services;

import com.lambdaschool.oauth2.logging.Loggable;
import com.lambdaschool.oauth2.models.Role;

import java.util.List;

@Loggable
public interface RoleService
{
    List<Role> findAll();

    Role findRoleById(long id);

    void delete(long id);

    Role save(Role role);

    Role findByName(String name);

    Role update(long id,
                Role role);
}