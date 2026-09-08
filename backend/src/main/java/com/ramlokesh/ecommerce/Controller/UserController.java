package com.ramlokesh.ecommerce.Controller;

import com.ramlokesh.ecommerce.Entity.Users;
import com.ramlokesh.ecommerce.Service.userService;
import com.ramlokesh.ecommerce.dto.usersDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
//we have a golbal method in the securityconfig file so no need to add the crossorigin annotation
public class UserController {
    @Autowired
    userService service;

    @PostMapping("/users")
    public ResponseEntity<usersDto> AddUser( @RequestBody Users user){

        if (service.emailExists(user.getEmail())){
            usersDto signupResponse = new usersDto(
                    0L,
                    409,
                    "Email already exists"
            );
            return ResponseEntity.status(HttpStatus.CONFLICT).body(signupResponse);
        }
        else if (service.phoneNumberexists(user.getPhoneNumber())){
            usersDto signupResponse = new usersDto(
                    0L,
                    409,
                    "PhoneNumber already exists"
            );
            return ResponseEntity.status(HttpStatus.CONFLICT).body(signupResponse);
        }
        Users users=service.Adduser(user);
         if(users.getId()>0) {
            usersDto signupResponse = new usersDto(
                    users.getId(),
                    201,
                    "Signup created successfully"
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(signupResponse);
        }
        else{
            usersDto signupResponse = new usersDto(
                    0L,
                    400,
                    "Signup creation failed"
            );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(signupResponse);
        }
    }

//    @GetMapping("/users/{id}")
//    public ResponseEntity<> getuser( @RequestBody Users user){
//
//    }
}
