package com.lambdaschool.authenticatedusers.controller;

import com.lambdaschool.authenticatedusers.model.Role;
import com.lambdaschool.authenticatedusers.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/roles")
public class RolesController
{
    @Autowired
    RoleService roleService;

    // http://localhost:2019/roles/roles
    @GetMapping(value = "/roles",
            produces = {"application/json"})
    public ResponseEntity<?> listRoles()
    {
        List<Role> allRoles = roleService.findAll();
        return new ResponseEntity<>(allRoles,
                HttpStatus.OK);
    }

    // http://localhost:2019/roles/role/3
    @GetMapping(value = "/role/{roleId}",
            produces = {"application/json"})
    public ResponseEntity<?> getRoleById(
            @PathVariable
                    Long roleId)
    {
        Role r = roleService.findRoleById(roleId);
        return new ResponseEntity<>(r,
                HttpStatus.OK);
    }

    // http://localhost:2019/roles/role/name/data
    @GetMapping(value = "/role/name/{roleName}",
            produces = {"application/json"})
    public ResponseEntity<?> getRoleByName(
            @PathVariable
                    String roleName)
    {
        Role r = roleService.findByName(roleName);
        return new ResponseEntity<>(r,
                HttpStatus.OK);
    }

    // http://localhost:2019/roles/role
    //    {
    //        "name" : "ANewRole"
    //    }
    @PostMapping(value = "/role")
    public ResponseEntity<?> addNewRole(@Valid
                                        @RequestBody
                                                Role newRole) throws URISyntaxException
    {
        newRole = roleService.save(newRole);

        // set the location header for the newly created resource
        HttpHeaders responseHeaders = new HttpHeaders();
        URI newRoleURI = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{roleid}")
                .buildAndExpand(newRole.getRoleid())
                .toUri();
        responseHeaders.setLocation(newRoleURI);

        return new ResponseEntity<>(null,
                responseHeaders,
                HttpStatus.CREATED);
    }


    // http://localhost:2019/roles/role/3
    //    {
    //        "name" : "ANewRole"
    //    }
    @PutMapping(value = "/role/{roleid}")
    public ResponseEntity<?> addNewRole(
            @PathVariable
                    long roleid,
            @Valid
            @RequestBody
                    Role newRole) throws URISyntaxException
    {
        newRole = roleService.update(roleid,
                newRole);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    // localhost:2019/roles/role/3
    @DeleteMapping("/role/{id}")
    public ResponseEntity<?> deleteRoleById(
            @PathVariable
                    long id)
    {
        roleService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}