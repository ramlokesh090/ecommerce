package com.ramlokesh.ecommerce.Service;

import com.ramlokesh.ecommerce.Entity.Users;
import com.ramlokesh.ecommerce.Repository.userRepo;
import com.ramlokesh.ecommerce.config.securityConfig;
import com.ramlokesh.ecommerce.dto.loginResponse;
import com.ramlokesh.ecommerce.dto.validateuserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class validUserService {

    @Autowired
    userRepo repo;
//    @Autowired
//    securityConfig config;

    @Autowired
    JWTService JWTservice;

    @Autowired
    AuthenticationManager authManager;
    // it is used to provide the authentcation to the user with the particulat email and password and
    //it  calls the authentication provider and after it will be verifies if the user is authenticated or not by using
    //is Authenticated() method


    public loginResponse verify(validateuserDto user) {

        Users user1 =repo.findByEmail(user.getEmail()).orElse(null);

        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
        if(authentication.isAuthenticated()) {

            //if the user is authenticated then we are used to genarayte the jwt token otherwise it is not possible to generate

            String Token = JWTservice.generateToken(user1.getEmail());
            //why we passing email is to pass into the subject in the jwt builder
            //here the token is created here also but we are createing a new class called JwtService to kepp all the jwt related
            //method call are placed there to understand better

            /*
            In a normal stateless JWT setup, the backend does NOT save the access token in the database.

            first it will checks the subject which contains the username(email) but it didnt trust username blindly then it checks
             The backend verifies the token using the signature, not by looking up the token in a database.
             here the signture is "signwith(getkey())"
            */

            return  new loginResponse(
                    user1.getId(),
                    user1.getRole(),
                    "login Succesfull",
                    201,
                    user1.getFirstName()+" "+user1.getMiddleName()+" " +user1.getLastName(),
                    Token
            );
        }
        return new loginResponse(
                    0L,
                    "no role exists",
                    "user not found",
                    400,
                    "no name",
                    "no token is created"
            );
    }
}
// this is used to just take the users and matches with the username(email and password )
// but it doesnt have authentication now we have to add that

//    public loginResponse validateLoginUser(validateuserDto loginuser) {
//        Users user =repo.findByEmail(loginuser.getEmail()).orElse(null);
//        if(user!=null && config.passwordEncoder().matches(loginuser.getPassword(),user.getPassword())){
//            return new loginResponse(
//                    user.getId(),
//                    user.getRole(),
//                    "login Succesfull",
//                    201,
//                    user.getFirstName()+" "+user.getMiddleName()+" " +user.getLastName()
//            );
//        }
//        else {
//            return new loginResponse(
//                    0L,
//                    "no role exists",
//                    "user not found",
//                    400,
//                    "no name"
//            );
//        }
//    }


