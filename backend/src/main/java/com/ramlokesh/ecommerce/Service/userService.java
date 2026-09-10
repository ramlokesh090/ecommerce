package com.ramlokesh.ecommerce.Service;
import com.ramlokesh.ecommerce.Entity.Users;
import com.ramlokesh.ecommerce.Repository.userRepo;
import com.ramlokesh.ecommerce.config.securityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class userService {
    @Autowired
    userRepo repo;
    @Autowired
    securityConfig config;
    public Users Adduser(Users user) {
        Users users=new Users();
        String encodedpassword = config.passwordEncoder().encode(user.getPassword());
        users.setPassword(encodedpassword);

        users.setEmail(user.getEmail());
        users.setFirstName(user.getFirstName());
        users.setLastName(user.getLastName());
        users.setMiddleName(user.getMiddleName());
        users.setPhoneNumber(user.getPhoneNumber());
        users.setRole(user.getRole());

//        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
//        config.passwordEncoder().encode(user.getConfirmPassword())
        //we will use like this also but it fine to use seperate method

        users.setConfirmPassword(config.passwordEncoder().encode(user.getConfirmPassword()));
        return repo.save(users);
    }

    public boolean emailExists(String email) {
        return repo.existsByEmail(email);
    }

    public boolean phoneNumberexists(Long phoneNumber) {
        return repo.existsByPhoneNumber(phoneNumber);
    }
}
