package com.ramlokesh.ecommerce.Controller;


import com.ramlokesh.ecommerce.Service.validUserService;
import com.ramlokesh.ecommerce.dto.loginResponse;
import com.ramlokesh.ecommerce.dto.validateuserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
//we have a golbal method in the securityconfig file so no need to add the crossorigin annotation

public class validateUserContoller {

    @Autowired
    validUserService loginUserService;

    @PostMapping("/login")
    public ResponseEntity<loginResponse> userValidation(@RequestBody validateuserDto user){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(loginUserService.verify(user));



//            here it is not by authentication just checking the passowrd and email is exists or not now
        //    we will implemnets authentucaton and enerate jwt token.
//            loginResponse reponse=loginUserService.validateLoginUser(user);
//            return ResponseEntity.status(HttpStatus.ACCEPTED).body(reponse);
    }
}
