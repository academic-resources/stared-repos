package com.lambdaschool.starthere.services;

import com.lambdaschool.starthere.exceptions.ResourceNotFoundException;
import com.lambdaschool.starthere.logging.Loggable;
import com.lambdaschool.starthere.models.Useremail;
import com.lambdaschool.starthere.repository.UseremailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Loggable
@Service(value = "useremailService")
public class UseremailServiceImpl
        implements UseremailService {
    @Autowired
    private UseremailRepository useremailrepos;

    @Override
    public List<Useremail> findAll() {
        List<Useremail> list = new ArrayList<>();
        useremailrepos.findAll()
                      .iterator()
                      .forEachRemaining(list::add);
        return list;
    }

    @Override
    public Useremail findUseremailById(long id) {
        return useremailrepos.findById(id)
                             .orElseThrow(() -> new ResourceNotFoundException("Useremail with id " + id + " Not Found!"));
    }

    @Override
    public List<Useremail> findByUserName(String username,
                                          boolean isAdmin) {
        Authentication authentication = SecurityContextHolder.getContext()
                                                             .getAuthentication();
        if (username.equalsIgnoreCase(authentication.getName()
                                                    .toLowerCase()) || isAdmin) {
            return useremailrepos.findAllByUser_Username(username.toLowerCase());
        } else {
            throw new ResourceNotFoundException(authentication.getName() + " not authorized to make change");
        }
    }


    @Override
    public void delete(long id,
                       boolean isAdmin) {
        if (useremailrepos.findById(id)
                          .isPresent()) {
            Authentication authentication = SecurityContextHolder.getContext()
                                                                 .getAuthentication();
            if (useremailrepos.findById(id)
                              .get()
                              .getUser()
                              .getUsername()
                              .equalsIgnoreCase(authentication.getName()) || isAdmin) {
                useremailrepos.deleteById(id);
            } else {
                throw new ResourceNotFoundException(authentication.getName() + " not authorized to make change");
            }
        } else {
            throw new ResourceNotFoundException("Useremail with id " + id + " Not Found!");
        }
    }

    @Override
    public Useremail update(long useremailid,
                            String emailaddress,
                            boolean isAdmin) {
        Authentication authentication = SecurityContextHolder.getContext()
                                                             .getAuthentication();
        if (useremailrepos.findById(useremailid)
                          .isPresent()) {
            if (useremailrepos.findById(useremailid)
                              .get()
                              .getUser()
                              .getUsername()
                              .equalsIgnoreCase(authentication.getName()) || isAdmin) {
                Useremail useremail = findUseremailById(useremailid);
                useremail.setUseremail(emailaddress.toLowerCase());
                return useremailrepos.save(useremail);
            } else {
                throw new ResourceNotFoundException(authentication.getName() + " not authorized to make change");
            }
        } else {
            throw new ResourceNotFoundException("Useremail with id " + useremailid + " Not Found!");
        }
    }
}
