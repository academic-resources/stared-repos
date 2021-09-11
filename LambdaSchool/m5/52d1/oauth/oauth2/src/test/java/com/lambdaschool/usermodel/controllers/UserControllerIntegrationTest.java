package com.lambdaschool.usermodel.controllers;

import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.containsString;
import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Integration test for UserController so only looking at 100% coverage on UserController
 */

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class UserControllerIntegrationTest
{
    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setUp() throws Exception
    {
        RestAssuredMockMvc.webAppContextSetup(webApplicationContext);

        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                                 .apply(SecurityMockMvcConfigurers.springSecurity())
                                 .build();
    }

    @After
    public void tearDown() throws Exception
    {
    }

    @WithUserDetails("testbarn")
    @Test
    public void whenMeasuredResponseTime() throws Exception
    {
        long time = System.currentTimeMillis();
        this.mockMvc.perform(get("/users/users"))
                    .andDo(print());
        long responseTime = (System.currentTimeMillis() - time);

        assertTrue("timestamp",
                   (responseTime < 5000L));
    }

    @WithUserDetails("testbarn")
    @Test
    public void getAllUsers() throws Exception
    {
        this.mockMvc.perform(get("/users/users"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string(containsString("testbarn")));

    }

    @WithUserDetails("testbarn")
    @Test
    public void getReallyAllUsers() throws Exception
    {
        this.mockMvc.perform(get("/users/allusers"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string(containsString("testbarn")));
    }

    @WithUserDetails("testbarn")
    @Test
    public void getUserName() throws Exception
    {
        this.mockMvc.perform(get("/users/getusername"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string(containsString("testbarn")));
    }

    @WithUserDetails("testbarn")
    @Test
    public void getUserInfo() throws Exception
    {
        this.mockMvc.perform(get("/users/getuserinfo"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string(containsString("testbarn")));
    }

    @WithUserDetails("testbarn")
    @Test
    public void getUserLikeName() throws Exception
    {
        this.mockMvc.perform(get("/users/user/name/like/{userName}",
                                 "test"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string(containsString("testbarn")));
    }

    @WithUserDetails("testbarn")
    @Test
    public void getUserById() throws Exception
    {
        this.mockMvc.perform(get("/users/user/{userid}",
                                 14))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string(containsString("testdog")));
    }

    @WithUserDetails("testbarn")
    @Test
    public void getUserByIdNotFound() throws Exception
    {
        this.mockMvc.perform(get("/users/user/{userid}",
                                 100))
                    .andDo(print())
                    .andExpect(status().is4xxClientError())
                    .andExpect(content().string(containsString("ResourceNotFoundException")));
    }

    @WithUserDetails("testbarn")
    @Test
    public void getUserByName() throws Exception
    {
        this.mockMvc.perform(get("/users/user/name/{userName}",
                                 "testcat"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string(containsString("testcat")));
    }

    @WithUserDetails("testbarn")
    @Test
    public void getUserByNameNotFound() throws Exception
    {
        this.mockMvc.perform(get("/users/user/name/{userName}",
                                 "rabbit"))
                    .andDo(print())
                    .andExpect(status().is4xxClientError())
                    .andExpect(content().string(containsString("ResourceNotFoundException")));
    }

    @WithUserDetails("testdog")
    @Test
    public void getCurrentUserName() throws Exception
    {
        this.mockMvc.perform(get("/users/getusername"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string(containsString("testdog")));
    }

    @WithUserDetails("testbarn")
    @Test
    public void givenPostAUser() throws Exception
    {
        mockMvc.perform(MockMvcRequestBuilders.post("/users/user")
                                              .content("{\"username\": \"Ginger\", \"password\": \"EATEATEAT\", \"primaryemail\" : \"ginger@home.local\"}")
                                              .contentType(MediaType.APPLICATION_JSON)
                                              .accept(MediaType.APPLICATION_JSON))
               .andDo(print())
               .andExpect(status().isCreated())
               .andExpect(MockMvcResultMatchers.header()
                                               .exists("location"));
    }

    @WithUserDetails("admin")
    @Test
    public void deleteUserById() throws Exception
    {
        mockMvc.perform(MockMvcRequestBuilders.delete("/users/user/{id}",
                                                      13))
               .andDo(print())
               .andExpect(status().is2xxSuccessful());
    }

    @WithUserDetails("admin")
    @Test
    public void deleteUserByIdNotFound() throws Exception
    {
        mockMvc.perform(MockMvcRequestBuilders.delete("/users/user/{id}",
                                                      100))
               .andDo(print())
               .andExpect(status().is4xxClientError());
    }

    @WithUserDetails("admin")
    @Test
    public void UpdateUser() throws Exception
    {
        mockMvc.perform(MockMvcRequestBuilders.put("/users/user/{userid}",
                                                   7)
                                              .content("{\"password\": \"EATEATEAT\"}")
                                              .contentType(MediaType.APPLICATION_JSON)
                                              .accept(MediaType.APPLICATION_JSON))
               .andDo(print())
               .andExpect(status().isOk());
    }

    @WithUserDetails("admin")
    @Test
    public void deleteUserRoleByIds() throws Exception
    {
        mockMvc.perform(MockMvcRequestBuilders.delete("/users/user/{userid}/role/{roleid}",
                                                      7,
                                                      2))
               .andDo(print())
               .andExpect(status().is2xxSuccessful());
    }

    @WithUserDetails("admin")
    @Test
    public void postUserRoleByIds() throws Exception
    {
        mockMvc.perform(MockMvcRequestBuilders.post("/users/user/{userid}/role/{roleid}",
                                                    7,
                                                    1))
               .andDo(print())
               .andExpect(status().is2xxSuccessful());
    }
}