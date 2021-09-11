package com.lambdaschool.starthere.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lambdaschool.starthere.models.Role;
import com.lambdaschool.starthere.models.User;
import com.lambdaschool.starthere.models.UserRoles;
import com.lambdaschool.starthere.models.Useremail;
import com.lambdaschool.starthere.services.UserService;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// mocking service to test controller

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@WithMockUser(username = "admin",
        roles = {"USER",
                "ADMIN"})
public class UserControllerUnitTest {
    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private List<User> userList;

    @Before
    public void setUp() throws
            Exception {
        userList = new ArrayList<>();

        Role r1 = new Role("admin");
        r1.setRoleid(1);
        Role r2 = new Role("user");
        r2.setRoleid(2);
        Role r3 = new Role("data");
        r3.setRoleid(3);

        // admin, data, user
        ArrayList<UserRoles> admins = new ArrayList<>();
        admins.add(new UserRoles(new User(),
                                 r1));
        admins.add(new UserRoles(new User(),
                                 r2));
        admins.add(new UserRoles(new User(),
                                 r3));
        User u1 = new User("admin",
                           "ILuvM4th!",
                           "admin@lambdaschool.local",
                           admins);

        u1.getUseremails()
          .add(new Useremail(u1,
                             "admin@email.local"));
        u1.getUseremails()
          .get(0)
          .setUseremailid(10);

        u1.getUseremails()
          .add(new Useremail(u1,
                             "admin@mymail.local"));
        u1.getUseremails()
          .get(1)
          .setUseremailid(11);

        u1.setUserid(101);
        userList.add(u1);

        // data, user
        ArrayList<UserRoles> datas = new ArrayList<>();
        datas.add(new UserRoles(new User(),
                                r3));
        datas.add(new UserRoles(new User(),
                                r2));
        User u2 = new User("cinnamon",
                           "1234567",
                           "cinnamon@lambdaschool.local",
                           datas);

        u2.getUseremails()
          .add(new Useremail(u2,
                             "cinnamon@mymail.local"));
        u2.getUseremails()
          .get(0)
          .setUseremailid(20);

        u2.getUseremails()
          .add(new Useremail(u2,
                             "hops@mymail.local"));
        u2.getUseremails()
          .get(1)
          .setUseremailid(21);

        u2.getUseremails()
          .add(new Useremail(u2,
                             "bunny@email.local"));
        u2.getUseremails()
          .get(2)
          .setUseremailid(22);

        u2.setUserid(102);
        userList.add(u2);

        // user
        ArrayList<UserRoles> users = new ArrayList<>();
        users.add(new UserRoles(new User(),
                                r1));
        User u3 = new User("testingbarn",
                           "ILuvM4th!",
                           "testingbarn@school.lambda",
                           users);

        u3.getUseremails()
          .add(new Useremail(u3,
                             "barnbarn@email.local"));
        u3.getUseremails()
          .get(0)
          .setUseremailid(30);

        u3.setUserid(103);
        userList.add(u3);

        users = new ArrayList<>();
        users.add(new UserRoles(new User(),
                                r2));
        User u4 = new User("testingcat",
                           "password",
                           "testingcat@school.lambda",
                           users);
        u4.setUserid(104);
        userList.add(u4);

        users = new ArrayList<>();
        users.add(new UserRoles(new User(),
                                r2));
        User u5 = new User("testingdog",
                           "password",
                           "testingdog@school.lambda",
                           users);
        u5.setUserid(105);
        userList.add(u5);

        System.out.println("\n*** Seed Data ***");
        for (User u : userList) {
            System.out.println(u);
        }
        System.out.println("*** Seed Data ***\n");

        RestAssuredMockMvc.webAppContextSetup(webApplicationContext);

        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                                 .apply(SecurityMockMvcConfigurers.springSecurity())
                                 .build();
    }

    @After
    public void tearDown() throws
            Exception {
    }

    @Test
    public void listAllUsers() throws
            Exception {
        String apiUrl = "/users/users";

        Mockito.when(userService.findAll(any(Pageable.class)))
               .thenReturn(userList);

        RequestBuilder rb = MockMvcRequestBuilders.get(apiUrl)
                                                  .accept(MediaType.APPLICATION_JSON);

        // the following actually performs a real controller call
        MvcResult r = mockMvc.perform(rb)
                             .andReturn(); // this could throw an exception
        String tr = r.getResponse()
                     .getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        String er = mapper.writeValueAsString(userList);

        System.out.println("Expect: " + er);
        System.out.println("Actual: " + tr);

        assertEquals("Rest API Returns List",
                     er,
                     tr);
    }

    @Test
    public void listReallyAllUsers() throws
            Exception {
        String apiUrl = "/users/users/all";

        Mockito.when(userService.findAll(Pageable.unpaged()))
               .thenReturn(userList);

        RequestBuilder rb = MockMvcRequestBuilders.get(apiUrl)
                                                  .accept(MediaType.APPLICATION_JSON);

        // the following actually performs a real controller call
        MvcResult r = mockMvc.perform(rb)
                             .andReturn(); // this could throw an exception
        String tr = r.getResponse()
                     .getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        String er = mapper.writeValueAsString(userList);

        System.out.println("Expect: " + er);
        System.out.println("Actual: " + tr);

        assertEquals("Rest API Returns List",
                     er,
                     tr);
    }

    @Test
    public void listUsersNameContaining() throws
            Exception {
        String apiUrl = "/users/user/name/like/cin";

        Mockito.when(userService.findByNameContaining(any(String.class),
                                                      any(Pageable.class)))
               .thenReturn(userList);

        RequestBuilder rb = MockMvcRequestBuilders.get(apiUrl)
                                                  .accept(MediaType.APPLICATION_JSON);

        // the following actually performs a real controller call
        MvcResult r = mockMvc.perform(rb)
                             .andReturn(); // this could throw an exception
        String tr = r.getResponse()
                     .getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        String er = mapper.writeValueAsString(userList);

        System.out.println("Expect: " + er);
        System.out.println("Actual: " + tr);

        assertEquals("Rest API Returns List",
                     er,
                     tr);
    }

    @Test
    public void getUserById() throws
            Exception {
        String apiUrl = "/users/user/12";

        Mockito.when(userService.findUserById(12))
               .thenReturn(userList.get(1));

        RequestBuilder rb = MockMvcRequestBuilders.get(apiUrl)
                                                  .accept(MediaType.APPLICATION_JSON);
        MvcResult r = mockMvc.perform(rb)
                             .andReturn(); // this could throw an exception
        String tr = r.getResponse()
                     .getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        String er = mapper.writeValueAsString(userList.get(1));

        System.out.println("Expect: " + er);
        System.out.println("Actual: " + tr);

        assertEquals("Rest API Returns List",
                     er,
                     tr);
    }

    @Test
    public void getUserByIdNotFound() throws
            Exception {
        String apiUrl = "/users/user/77";

        Mockito.when(userService.findUserById(77))
               .thenReturn(null);

        RequestBuilder rb = MockMvcRequestBuilders.get(apiUrl)
                                                  .accept(MediaType.APPLICATION_JSON);
        MvcResult r = mockMvc.perform(rb)
                             .andReturn(); // this could throw an exception
        String tr = r.getResponse()
                     .getContentAsString();

        String er = "";

        System.out.println("Expect: " + er);
        System.out.println("Actual: " + tr);

        assertEquals("Rest API Returns List",
                     er,
                     tr);
    }

    @Test
    public void getUserByName() throws
            Exception {
        String apiUrl = "/users/user/name/testing";

        Mockito.when(userService.findByName("testing"))
               .thenReturn(userList.get(0));

        RequestBuilder rb = MockMvcRequestBuilders.get(apiUrl)
                                                  .accept(MediaType.APPLICATION_JSON);
        MvcResult r = mockMvc.perform(rb)
                             .andReturn(); // this could throw an exception
        String tr = r.getResponse()
                     .getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        String er = mapper.writeValueAsString(userList.get(0));

        System.out.println("Expect: " + er);
        System.out.println("Actual: " + tr);

        assertEquals("Rest API Returns List",
                     er,
                     tr);
    }

    @Test
    public void getCurrentUserName() throws
            Exception {
        String apiUrl = "/users/getusername";

        RequestBuilder rb = MockMvcRequestBuilders.get(apiUrl)
                                                  .accept(MediaType.APPLICATION_JSON);
        MvcResult r = mockMvc.perform(rb)
                             .andReturn(); // this could throw an exception
        String tr = r.getResponse()
                     .getContentAsString();

        String er =
                "{\"password\":\"password\",\"username\":\"admin\",\"authorities\":[{\"authority\":\"ROLE_ADMIN\"},{\"authority\":\"ROLE_USER\"}],\"accountNonExpired\":true,\"accountNonLocked\":true,\"credentialsNonExpired\":true,\"enabled\":true}";

        System.out.println("Expect: " + er);
        System.out.println("Actual: " + tr);

        assertEquals("Rest API Returns List",
                     er,
                     tr);
    }

    @Test
    public void getUserInfo() throws
            Exception {
        String apiUrl = "/users/getuserinfo";

        Mockito.when(userService.findByName(anyString()))
               .thenReturn(userList.get(0));

        RequestBuilder rb = MockMvcRequestBuilders.get(apiUrl)
                                                  .accept(MediaType.APPLICATION_JSON);
        MvcResult r = mockMvc.perform(rb)
                             .andReturn(); // this could throw an exception
        String tr = r.getResponse()
                     .getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        String er = mapper.writeValueAsString(userList.get(0));

        System.out.println("Expect: " + er);
        System.out.println("Actual: " + tr);

        assertEquals("Rest API Returns List",
                     er,
                     tr);
    }

    @Test
    public void addNewUser() throws
            Exception {
        String apiUrl = "/users/user";

        // build a user
        ArrayList<UserRoles> thisRole = new ArrayList<>();
        ArrayList<Useremail> thisEmail = new ArrayList<>();
        User u1 = new User();
        u1.setUserid(100);
        u1.setUsername("tiger");
        u1.setPassword("ILuvM4th!");
        u1.setPrimaryemail("tiger@home.local");
        u1.setUserroles(thisRole);
        u1.setUseremails(thisEmail);

        ObjectMapper mapper = new ObjectMapper();
        String userString = mapper.writeValueAsString(u1);

        Mockito.when(userService.save(any(User.class)))
               .thenReturn(u1);

        RequestBuilder rb = MockMvcRequestBuilders.post(apiUrl)
                                                  .contentType(MediaType.APPLICATION_JSON)
                                                  .accept(MediaType.APPLICATION_JSON)
                                                  .content(userString);

        mockMvc.perform(rb)
               .andExpect(status().isCreated())
               .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void updateUser() throws
            Exception {
        String apiUrl = "/users/user/{userid}";

        // build a user
        User u1 = new User();
        u1.setUserid(100);
        u1.setUsername("tigerUpdated");
        u1.setPrimaryemail("home@local.home");
        u1.setPassword("ILuvM4th!");

        Mockito.when(userService.update(u1,
                                        100L,
                                        true))
               .thenReturn(userList.get(0));

        ObjectMapper mapper = new ObjectMapper();
        String userString = mapper.writeValueAsString(u1);

        RequestBuilder rb = MockMvcRequestBuilders.put(apiUrl,
                                                       100L)
                                                  .contentType(MediaType.APPLICATION_JSON)
                                                  .accept(MediaType.APPLICATION_JSON)
                                                  .content(userString);

        mockMvc.perform(rb)
               .andExpect(status().is2xxSuccessful())
               .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void deleteUserById() throws
            Exception {
        String apiUrl = "/users/user/{userid}";

        RequestBuilder rb = MockMvcRequestBuilders.delete(apiUrl,
                                                          "3")
                                                  .contentType(MediaType.APPLICATION_JSON)
                                                  .accept(MediaType.APPLICATION_JSON);
        mockMvc.perform(rb)
               .andExpect(status().is2xxSuccessful())
               .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void deleteUserRoleByIds() throws
            Exception {
        String apiUrl = "/users/user/{userid}/role/{roleid}";

        RequestBuilder rb = MockMvcRequestBuilders.delete(apiUrl,
                                                          3,
                                                          2);

        mockMvc.perform(rb)
               .andExpect(status().is2xxSuccessful())
               .andDo(MockMvcResultHandlers.print());
    }

    // @PostMapping("/user/{userid}/role/{roleid}")
    // userService.addUserRole(userid, roleid);
    @Test
    public void postUserRoleByIds() throws
            Exception {
        String apiUrl = "/users/user/{userid}/role/{roleid}";

        RequestBuilder rb = MockMvcRequestBuilders.post(apiUrl,
                                                        3,
                                                        2);

        mockMvc.perform(rb)
               .andExpect(status().is2xxSuccessful())
               .andDo(MockMvcResultHandlers.print());
    }
}