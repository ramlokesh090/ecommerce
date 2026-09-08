package com.ramlokesh.ecommerce.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @NotBlank(message = "First name is required")
    private String firstName;
    @NotBlank(message = "Last name is required")
    private String lastName;
    private String middleName;
    @NotNull(message = "Phonenumber is required")
//    @Size (min=10,max=10,message = "phone number must contains 10dgits")
    private long phoneNumber;
    @NotBlank(message = "password is required")
    private String password;
    @Transient
    //@Transient tells spring that this fields belongs to the java object not related to database so dont add as a columnokay
    @NotBlank(message = "Confirmpassword is required")
    private String confirmPassword;
    @NotBlank(message="role is required")
    private String role;
    @Email(message="please enter valid email")
    @NotBlank(message="email is required")
    private String email;
}
