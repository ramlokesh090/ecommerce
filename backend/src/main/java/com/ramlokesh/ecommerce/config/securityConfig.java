package com.ramlokesh.ecommerce.config;


import com.ramlokesh.ecommerce.Service.Myuserdetailservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration
@EnableWebSecurity
public class securityConfig {

    @Autowired
    private Myuserdetailservice userDetailsService;
    @Autowired
    private JWTFilter JWTFilter;
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//here passwordencoder is implements the Bcryptpasswordencoder so return type passwordencode is fine

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        return http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/users",
                                "/login"
                        ).permitAll()

                        .anyRequest().authenticated())
                //the above one is used to authentication of the ul that created by restController execept "/users(means sinup)","/login"

                .httpBasic(Customizer.withDefaults())

                //.httpformLogin(Customier.withDefaults)
                //this will be used for the browser login but it will be asks authentication like enter username,password for when the session id changes
                // so that is why we didableed it is we used "httpbasic" insted of it

                .sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // this is used to change the session id for every request okay to dont enter the malicious requests
                .addFilterBefore(JWTFilter, UsernamePasswordAuthenticationFilter.class)

                //here this jwtfilter is our custom filter which extends the "oncePerRequestFilter"

                //here what it will says, by default spring securityfilterchain implements "usernamepasswordAuthenticationfilter"
                //what it will says is after jwtfilter completes then if it says like the user is authenticated by using the token
                //the token is not expired okay and also if the jwt filter is authenticate dit will tells the usernamepasswordauthenticaionfilter
                //like the user is authnticated not need use the username and password everytime then the usenameauthenticationfilter is skipped.
                //what jwt filter is checks initially username(not blindly trusted) in the token and then signature means the secretkey in the token.
                .build();
    }
    @Bean
    public AuthenticationProvider AutenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        //here userDetails service is an interface so we have to create a class and we have to implemats the userDetailsService


//        provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
//        here this set the default passwors without encrypt for encrypt we have to do BCryption

        provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        //here 12 means the password is convert into sha25 by 12 times to become stronger.

        // it will accept the password and converts into brcrypt password

        //provider.setUserDetailsService(userDetailsService);  it is used in older version but newer versions
        //we will use the userDetails Service to be called in the "DaoAutheticationprovider"


        return provider;
    }
    @Bean
    public AuthenticationManager manager(AuthenticationConfiguration config){
        return config.getAuthenticationManager();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}

/*

here when we use the csrf token then we need to mandatorily passes the csrf token in the put,post,delete requests
why means here we are updating the database okay thats why for getmapping not need we are only fetching the api okay
*/