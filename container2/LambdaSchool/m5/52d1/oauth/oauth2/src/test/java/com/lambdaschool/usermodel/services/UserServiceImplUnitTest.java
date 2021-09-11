package com.lambdaschool.usermodel.services;

import com.lambdaschool.usermodel.UserModelApplication;
import com.lambdaschool.usermodel.exceptions.ResourceFoundException;
import com.lambdaschool.usermodel.exceptions.ResourceNotFoundException;
import com.lambdaschool.usermodel.models.Role;
import com.lambdaschool.usermodel.models.User;
import com.lambdaschool.usermodel.models.UserRoles;
import com.lambdaschool.usermodel.models.Useremail;
import org.junit.After;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

import static junit.framework.TestCase.assertEquals;

/**
 * I am testing UserServiceImpl so want 100% in UserServiceImpl
 */

@RunWith(SpringRunner.class)
@SpringBootTest(classes = UserModelApplication.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UserServiceImplUnitTest
{
    @Autowired
    private UserService userService;

    @Before
    public void setUp() throws Exception
    {
        MockitoAnnotations.initMocks(this);
    }

    @After
    public void tearDown() throws Exception
    {
    }

    @Test
    public void B_findUserById()
    {
        assertEquals("admin",
                     userService.findUserById(4)
                                .getUsername());
    }

    @Test(expected = ResourceNotFoundException.class)
    public void BA_findUserByIdNotFound()
    {
        assertEquals("admin",
                     userService.findUserById(10)
                                .getUsername());
    }

    @Test
    public void C_findAll()
    {
        assertEquals(5,
                     userService.findAll(Pageable.unpaged())
                                .size());
    }

    @Test
    public void D_delete()
    {
        userService.delete(13);
        assertEquals(4,
                     userService.findAll(Pageable.unpaged())
                                .size());
    }

    @Test(expected = ResourceNotFoundException.class)
    public void DA_notFoundDelete()
    {
        userService.delete(100);
        assertEquals(4,
                     userService.findAll(Pageable.unpaged())
                                .size());
    }

    @Test
    public void E_findByUsername()
    {
        assertEquals("admin",
                     userService.findByName("admin")
                                .getUsername());
    }

    @Test(expected = ResourceNotFoundException.class)
    public void AA_findByUsernameNotfound()
    {
        assertEquals("admin",
                     userService.findByName("turtle")
                                .getUsername());
    }

    @Test
    public void AB_findByNameContaining()
    {
        assertEquals(4,
                     userService.findByNameContaining("a",
                                                      Pageable.unpaged())
                                .size());
    }

    @Test
    public void F_save()
    {
        ArrayList<UserRoles> datas = new ArrayList<>();
        User u2 = new User("tiger",
                           "ILuvMath!",
                           "tiger@school.lambda",
                           datas);
        u2.getUseremails()
          .add(new Useremail(u2,
                             "tiger@tiger.local"));

        User saveU2 = userService.save(u2);

        System.out.println("*** DATA ***");
        System.out.println(saveU2);
        System.out.println("*** DATA ***");

        assertEquals("tiger@tiger.local",
                     saveU2.getUseremails()
                           .get(0)
                           .getUseremail());
    }

    @Test(expected = ResourceFoundException.class)
    public void FA_saveResourceFound()
    {
        ArrayList<UserRoles> datas = new ArrayList<>();
        User u2 = new User("cinnamon",
                           "ILuvMath!",
                           "cinnamon@school.lambda",
                           datas);
        u2.getUseremails()
          .add(new Useremail(u2,
                             "tiger@tiger.local"));

        User saveU2 = userService.save(u2);

        System.out.println("*** DATA ***");
        System.out.println(saveU2);
        System.out.println("*** DATA ***");

        assertEquals("tiger@tiger.local",
                     saveU2.getUseremails()
                           .get(0)
                           .getUseremail());
    }

    @Transactional
    @WithUserDetails("cinnamon")
    @Test
    public void G_update()
    {
        ArrayList<UserRoles> datas = new ArrayList<>();
        User u2 = new User("cinnamon",
                           "password",
                           "cinnamon@school.lambda",
                           datas);
        u2.getUseremails()
          .add(new Useremail(u2,
                             "cinnamon@mymail.thump"));
        u2.getUseremails()
          .add(new Useremail(u2,
                             "hops@mymail.thump"));
        u2.getUseremails()
          .add(new Useremail(u2,
                             "bunny@email.thump"));

        User updatedu2 = userService.update(u2,
                                            7,
                                            false);

        System.out.println("*** DATA ***");
        System.out.println(updatedu2);
        System.out.println("*** DATA ***");

        int checking = updatedu2.getUseremails()
                                .size() - 1;
        assertEquals("bunny@email.thump",
                     updatedu2.getUseremails()
                              .get(checking)
                              .getUseremail());
    }

    @Transactional
    @WithUserDetails("cinnamon")
    @Test(expected = ResourceFoundException.class)
    public void GA_updateWithUserRole()
    {
        Role r2 = new Role("user");

        ArrayList<UserRoles> datas = new ArrayList<>();
        User u2 = new User("cinnamon",
                           "password",
                           "cinnamon@school.lambda",
                           datas);
        datas.add(new UserRoles(u2,
                                r2));
        u2.getUseremails()
          .add(new Useremail(u2,
                             "cinnamon@mymail.thump"));
        u2.getUseremails()
          .add(new Useremail(u2,
                             "hops@mymail.thump"));
        u2.getUseremails()
          .add(new Useremail(u2,
                             "bunny@email.thump"));

        User updatedu2 = userService.update(u2,
                                            7,
                                            false);

        System.out.println("*** DATA ***");
        System.out.println(updatedu2);
        System.out.println("*** DATA ***");

        int checking = updatedu2.getUseremails()
                                .size() - 1;
        assertEquals("bunny@email.thump",
                     updatedu2.getUseremails()
                              .get(checking)
                              .getUseremail());
    }

    @Transactional
    @WithUserDetails("cinnamon")
    @Test(expected = ResourceNotFoundException.class)
    public void GB_updateNotCurrentUserNorAdmin()
    {
        Role r2 = new Role("user");

        ArrayList<UserRoles> datas = new ArrayList<>();
        User u2 = new User("cinnamon",
                           "password",
                           "cinnamon@school.lambda",
                           datas);
        u2.getUseremails()
          .add(new Useremail(u2,
                             "cinnamon@mymail.thump"));
        u2.getUseremails()
          .add(new Useremail(u2,
                             "hops@mymail.thump"));
        u2.getUseremails()
          .add(new Useremail(u2,
                             "bunny@email.thump"));

        User updatedu2 = userService.update(u2,
                                            8,
                                            false);

        System.out.println("*** DATA ***");
        System.out.println(updatedu2);
        System.out.println("*** DATA ***");

        int checking = updatedu2.getUseremails()
                                .size() - 1;
        assertEquals("bunny@email.thump",
                     updatedu2.getUseremails()
                              .get(checking)
                              .getUseremail());
    }

    @Test(expected = ResourceNotFoundException.class)
    public void H_deleteUserRoleComboNotFound()
    {
        // testing cinnamon and user roles
        userService.deleteUserRole(11,
                                   2);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void HA_deleteUserRoleRoleNotFound()
    {
        userService.deleteUserRole(7,
                                   50);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void HB_deleteUserRoleUserNotFound()
    {
        userService.deleteUserRole(50,
                                   2);
    }

    @Test(expected = ResourceFoundException.class)
    public void IA_addUserRoleUserRoleFound()
    {
        userService.addUserRole(11,
                                1);
    }

    @Test
    public void IB_deleteUserRole()
    {
        userService.deleteUserRole(11,
                                   1);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void IC_addUserRoleRoleNotFound()
    {
        userService.addUserRole(7,
                                50);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void ID_addUserRoleUserNotFound()
    {
        userService.addUserRole(50,
                                2);
    }

    @Test
    public void IE_addUserRole()
    {
        userService.addUserRole(11,
                                2);
    }
}