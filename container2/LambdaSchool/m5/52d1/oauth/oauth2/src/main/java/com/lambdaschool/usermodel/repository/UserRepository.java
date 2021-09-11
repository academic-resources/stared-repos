package com.lambdaschool.usermodel.repository;

import com.lambdaschool.usermodel.models.User;
import com.lambdaschool.usermodel.view.UserNameCountEmails;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface UserRepository extends PagingAndSortingRepository<User, Long>
{
    User findByUsername(String username);

    List<User> findByUsernameContainingIgnoreCase(String name,
                                                  Pageable pageable);

    @Query(value = "SELECT u.username as usernamerpt, count(ue.useremailid) as countemails FROM users u JOIN useremails ue ON u.userid = ue.userid GROUP BY u.username",
           nativeQuery = true)
    List<UserNameCountEmails> getCountUserEmails();
}
