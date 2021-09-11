package com.lambdaschool.oauth2.services;

import com.lambdaschool.oauth2.logging.Loggable;
import com.lambdaschool.oauth2.models.Useremail;

import java.util.List;

@Loggable
public interface UseremailService
{
    List<Useremail> findAll();

    Useremail findUseremailById(long id);

    List<Useremail> findByUserName(String username,
                                   boolean isAdmin);

    void delete(long id,
                boolean isAdmin);

    Useremail update(long useremailid,
                     String emailaddress,
                     boolean isAdmin);

    // note emails are added through the user process
}
