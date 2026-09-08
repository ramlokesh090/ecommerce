package com.ramlokesh.ecommerce.Service;

import com.ramlokesh.ecommerce.Entity.Users;
import com.ramlokesh.ecommerce.Repository.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class Myuserdetailservice implements UserDetailsService {
    @Autowired
    userRepo repo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //here we have to return theuserdetails object.but the userDetails is the interface so we have to implements it by using  class
        Users user = repo.findByEmail(email).orElseThrow(()->
                new UsernameNotFoundException("User not found")
        );
        //userdetails by creating the another class that wuill impleamts the userDetails
        return new Myuserdetails(user);  //now the userdetails will return via myuserdetails class which impleamens Userdetails
    }
}
