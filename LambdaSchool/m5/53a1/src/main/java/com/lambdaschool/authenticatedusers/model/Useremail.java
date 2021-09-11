package com.lambdaschool.authenticatedusers.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Table(name = "useremails",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"userid", "useremail"})})
public class Useremail extends Auditable
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long useremailid;

    @Column(nullable = false)
    @Email
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
        return useremail;
    }

    public void setUseremail(String useremail)
    {
        this.useremail = useremail;
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    @Override
    public String toString()
    {
        return "Useremail{" + "useremailid=" + useremailid + ", useremail='" + useremail + '\'' + ", user=" + user.getUsername() + '}';
    }
}