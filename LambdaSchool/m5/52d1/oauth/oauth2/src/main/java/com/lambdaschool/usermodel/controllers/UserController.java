package com.lambdaschool.usermodel.controllers;

import com.lambdaschool.usermodel.handlers.RestExceptionHandler;
import com.lambdaschool.usermodel.logging.Loggable;
import com.lambdaschool.usermodel.models.ErrorDetail;
import com.lambdaschool.usermodel.models.User;
import com.lambdaschool.usermodel.services.UserService;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/users")
@Loggable
@Api(tags = {"UserEndpoints"})
public class UserController
{
    private static final Logger logger = LoggerFactory.getLogger(RestExceptionHandler.class);

    @Autowired
    private UserService userService;

    // http://localhost:2019/users/users/?page=1&size=1
    // http://localhost:2019/users/users/?sort=username,desc&sort=<field>,asc
    // http://localhost:2019/users/users
    @ApiOperation(value = "returns all Users with paging and sorting",
                  response = User.class,
                  responseContainer = "List")
    @ApiImplicitParams({@ApiImplicitParam(name = "page",
                                          dataType = "integer",
                                          paramType = "query",
                                          value = "Results page you want to retrieve (1..N)"), @ApiImplicitParam(name = "size",
                                                                                                                 dataType = "integer",
                                                                                                                 paramType = "query",
                                                                                                                 value = "Number of records per page."), @ApiImplicitParam(name = "sort",
                                                                                                                                                                           allowMultiple = true,
                                                                                                                                                                           dataType = "string",
                                                                                                                                                                           paramType = "query",
                                                                                                                                                                           value = "Sorting criteria in the format: property(,asc|desc). " + "Default sort order is ascending. " + "Multiple sort criteria are supported.")})

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping(value = "/users",
                produces = {"application/json"})
    public ResponseEntity<?> listAllUsers(HttpServletRequest request,
                                          @PageableDefault(page = 0,
                                                           size = 5)
                                                  Pageable pageable)
    {
        logger.trace(request.getMethod()
                            .toUpperCase() + " " + request.getRequestURI() + " accessed");

        List<User> myUsers = userService.findAll(pageable);
        return new ResponseEntity<>(myUsers,
                                    HttpStatus.OK);
    }


    // http://localhost:2019/users/allusers
    @ApiOperation(value = "returns all Users without paging or sorting",
                  response = User.class,
                  responseContainer = "List")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping(value = "/allusers",
                produces = {"application/json"})
    public ResponseEntity<?> reallyListAllUsers()
    {
        List<User> myUsers = userService.findAll(Pageable.unpaged());
        return new ResponseEntity<>(myUsers,
                                    HttpStatus.OK);
    }


    // http://localhost:2019/users/user/7
    @ApiOperation(value = "Retrieve a user based of off user id",
                  response = User.class)
    @ApiResponses(value = {@ApiResponse(code = 200,
                                        message = "User Found",
                                        response = User.class), @ApiResponse(code = 404,
                                                                             message = "User Not Found",
                                                                             response = ErrorDetail.class)})
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping(value = "/user/{userId}",
                produces = {"application/json"})
    public ResponseEntity<?> getUserById(HttpServletRequest request,
                                         @ApiParam(value = "User id",
                                                   required = true,
                                                   example = "4")
                                         @PathVariable
                                                 Long userId)
    {
        logger.trace(request.getMethod()
                            .toUpperCase() + " " + request.getRequestURI() + " accessed");

        User u = userService.findUserById(userId);
        return new ResponseEntity<>(u,
                                    HttpStatus.OK);
    }


    // http://localhost:2019/users/user/name/cinnamon
    @ApiOperation(value = "returns the user based off of user name",
                  response = User.class)
    @ApiResponses(value = {@ApiResponse(code = 200,
                                        message = "User Found",
                                        response = User.class), @ApiResponse(code = 404,
                                                                             message = "User Not Found",
                                                                             response = ErrorDetail.class)})
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping(value = "/user/name/{userName}",
                produces = {"application/json"})
    public ResponseEntity<?> getUserByName(HttpServletRequest request,
                                           @ApiParam(value = "Username",
                                                     required = true,
                                                     example = "somename")
                                           @PathVariable
                                                   String userName)
    {
        logger.trace(request.getMethod()
                            .toUpperCase() + " " + request.getRequestURI() + " accessed");

        User u = userService.findByName(userName);
        return new ResponseEntity<>(u,
                                    HttpStatus.OK);
    }


    // http://localhost:2019/users/user/name/like/da?sort=username
    @ApiOperation(value = "returns all Users whose name contains the given substring with paging and sorting",
                  response = User.class,
                  responseContainer = "List")
    @ApiImplicitParams({@ApiImplicitParam(name = "page",
                                          dataType = "integer",
                                          paramType = "query",
                                          value = "Results page you want to retrieve (1..N)"), @ApiImplicitParam(name = "size",
                                                                                                                 dataType = "integer",
                                                                                                                 paramType = "query",
                                                                                                                 value = "Number of records per page."), @ApiImplicitParam(name = "sort",
                                                                                                                                                                           allowMultiple = true,
                                                                                                                                                                           dataType = "string",
                                                                                                                                                                           paramType = "query",
                                                                                                                                                                           value = "Sorting criteria in the format: property(,asc|desc). " + "Default sort order is ascending. " + "Multiple sort criteria are supported.")})
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping(value = "/user/name/like/{userName}",
                produces = {"application/json"})
    public ResponseEntity<?> getUserLikeName(
            @ApiParam(value = "Username",
                      required = true,
                      example = "partofname")
            @PathVariable
                    String userName,
            @PageableDefault(page = 0,
                             size = 5)
                    Pageable pageable)
    {
        List<User> u = userService.findByNameContaining(userName,
                                                        pageable);
        return new ResponseEntity<>(u,
                                    HttpStatus.OK);
    }


    // http://localhost:2019/users/user
    /*
            {
                "username": "Mojo",
                "primaryemail": "mojo@lambdaschool.local",
                "password" : "Coffee123",
                "useremails": [
                    {
                        "useremail": "mojo@mymail.local"
                    },
                    {
                        "useremail": "mojo@email.local"
                    }
                    ],
                "userroles": [
                    {
                       "role": {
                           "roleid": 1
                        }
                    },
                    {
                       "role": {
                           "roleid": 2
                       }
                    }
                    ]
            }
     */
    @ApiOperation(value = "adds a user given in the request body",
                  response = Void.class)
    @ApiResponses(value = {@ApiResponse(code = 200,
                                        message = "User Found",
                                        response = User.class), @ApiResponse(code = 404,
                                                                             message = "User Not Found",
                                                                             response = ErrorDetail.class)})
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping(value = "/user",
                 consumes = {"application/json"})
    public ResponseEntity<?> addNewUser(HttpServletRequest request,
                                        @Valid
                                        @RequestBody
                                                User newuser) throws URISyntaxException
    {
        logger.trace(request.getMethod()
                            .toUpperCase() + " " + request.getRequestURI() + " accessed");

        newuser = userService.save(newuser);

        // set the location header for the newly created resource
        HttpHeaders responseHeaders = new HttpHeaders();
        URI newUserURI = ServletUriComponentsBuilder.fromCurrentRequest()
                                                    .path("/{userid}")
                                                    .buildAndExpand(newuser.getUserid())
                                                    .toUri();
        responseHeaders.setLocation(newUserURI);

        return new ResponseEntity<>(null,
                                    responseHeaders,
                                    HttpStatus.CREATED);
    }


    // http://localhost:2019/users/user/7
/*

        {
            "username": "cinabun",
            "primaryemail": "cinabun@lambdaschool.home",
            "useremails": [
            {
                    "useremail": "cinnamon@mymail.home"
            },
            {
                    "useremail": "hops@mymail.home"
            },
            {
                    "useremail": "bunny@email.home"
            }
            ]
        }

*/
    @PutMapping(value = "/user/{id}",
                consumes = {"application/json"})
    public ResponseEntity<?> updateUser(HttpServletRequest request,
                                        @RequestBody
                                                User updateUser,
                                        @PathVariable
                                                long id)
    {
        logger.trace(request.getMethod()
                            .toUpperCase() + " " + request.getRequestURI() + " accessed");

        userService.update(updateUser,
                           id,
                           request.isUserInRole("ADMIN"));
        return new ResponseEntity<>(HttpStatus.OK);
    }


    // http://localhost:2019/users/user/14
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping(value = "/user/{id}")
    public ResponseEntity<?> deleteUserById(HttpServletRequest request,
                                            @PathVariable
                                                    long id)
    {
        logger.trace(request.getMethod()
                            .toUpperCase() + " " + request.getRequestURI() + " accessed");

        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    // http://localhost:2019/users/user/7/role/2
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping(value = "/user/{userid}/role/{roleid}")
    public ResponseEntity<?> deleteUserRoleByIds(HttpServletRequest request,
                                                 @PathVariable
                                                         long userid,
                                                 @PathVariable
                                                         long roleid)
    {
        logger.trace(request.getMethod()
                            .toUpperCase() + " " + request.getRequestURI() + " accessed");

        userService.deleteUserRole(userid,
                                   roleid);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    // http://localhost:2019/users/user/15/role/2
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping(value = "/user/{userid}/role/{roleid}")
    public ResponseEntity<?> postUserRoleByIds(HttpServletRequest request,
                                               @PathVariable
                                                       long userid,
                                               @PathVariable
                                                       long roleid)
    {
        logger.trace(request.getMethod()
                            .toUpperCase() + " " + request.getRequestURI() + " accessed");

        userService.addUserRole(userid,
                                roleid);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    // http://localhost:2019/users/user/email/count
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping(value = "/user/email/count",
                produces = {"application/json"})
    public ResponseEntity<?> getNumUserEmails(HttpServletRequest request)
    {
        logger.trace(request.getMethod()
                            .toUpperCase() + " " + request.getRequestURI() + " accessed");

        return new ResponseEntity<>(userService.getCountUserEmails(),
                                    HttpStatus.OK);
    }


    // http://localhost:2019/users/getuserinfo
    @GetMapping(value = "/getuserinfo",
                produces = {"application/json"})
    public ResponseEntity<?> getCurrentUserInfo(HttpServletRequest request,
                                                Authentication authentication)
    {
        logger.trace(request.getMethod()
                            .toUpperCase() + " " + request.getRequestURI() + " accessed");

        User u = userService.findByName(authentication.getName());
        return new ResponseEntity<>(u,
                                    HttpStatus.OK);
    }


    // http://localhost:2019/users/getusername
    @GetMapping(value = "/getusername",
                produces = {"application/json"})
    @ResponseBody
    public ResponseEntity<?> getCurrentUserName(HttpServletRequest request,
                                                Authentication authentication)
    {
        logger.trace(request.getMethod()
                            .toUpperCase() + " " + request.getRequestURI() + " accessed");

        return new ResponseEntity<>(authentication.getPrincipal(),
                                    HttpStatus.OK);
    }
}