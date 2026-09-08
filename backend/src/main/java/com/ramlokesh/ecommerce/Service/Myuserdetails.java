package com.ramlokesh.ecommerce.Service;

import com.ramlokesh.ecommerce.Entity.Users;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class Myuserdetails implements UserDetails {
    
    private Users user;

    public Myuserdetails(Users user){
        this.user=user;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(
                new SimpleGrantedAuthority(user.getRole())
        );
    }

    @Override
    public @Nullable String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
       // return UserDetails.super.isAccountNonExpired();  here we wont enabled this after enabling use this
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        //return UserDetails.super.isAccountNonLocked();      here we wont enabled this after enabling use this
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        //return UserDetails.super.isCredentialsNonExpired();   here we wont enabled this after enabling use this
        return true;
    }

    @Override
    public boolean isEnabled() {
//        return UserDetails.super.isEnabled();  here we wont enabled this after enabling use this
        return true;
    }
}
