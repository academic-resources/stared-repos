package com.lambdaschool.usermodel.services;

import com.lambdaschool.usermodel.logging.Loggable;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Loggable
@Component
public class UserAuditing implements AuditorAware<String>
{
    @Override
    public Optional<String> getCurrentAuditor()
    {
        String uname;

        uname = "SYSTEM";

        return Optional.of(uname);
    }
}
