package com.lambdaschool.usermodel.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lambdaschool.usermodel.logging.Loggable;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Loggable
@Entity
@Table(name = "useremails",
       uniqueConstraints = {@UniqueConstraint(columnNames = {"userid", "useremail"})})
@ApiModel(value = "Useremail",
          description = "A list of secondary emails for the user")
public class Useremail extends Auditable
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long useremailid;

    @Column(nullable = false)
    @Email(message = "Email must be in valid format username@domain.toplevel")
    private String useremail;

    @ManyToOne
    @JoinColumn(name = "userid",
                nullable = false)
    @JsonIgnoreProperties("useremails")
    private User user;

    public Useremail()
    {
    }

    public Useremail(User user,
                     String useremail)
    {
        this.useremail = useremail;
        this.user = user;
    }

    public long getUseremailid()
    {
        return useremailid;
    }

    public void setUseremailid(long useremailid)
    {
        this.useremailid = useremailid;
    }

    public String getUseremail()
    {
        if (useremail == null) // this is possible when updating a user
        {
            return null;
        } else
        {
            return useremail.toLowerCase();
        }
    }

    public void setUseremail(String useremail)
    {
        this.useremail = useremail.toLowerCase();
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }
}
