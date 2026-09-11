//package com.ramlokesh.ecommerce.config;
//
//import com.ramlokesh.ecommerce.Service.JWTService;
//import com.ramlokesh.ecommerce.Service.Myuserdetailservice;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.apache.catalina.core.ApplicationContext;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@Component
////here OncePerRequestFilter what it will do is it gives filter charactr to the custom filter that is jwtfilter class
//public class JWTFilter extends OncePerRequestFilter {
//
//
//    @Autowired
//    Myuserdetailservice userservice;
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        //Bearer jwtToken  -> in this format the token will come it will come from the header called "Authorization"
//        String AuthHeader=request.getHeader("Authorization");
//        String token="";
//        String userName="";//(Email)why username is we must use the email/username for login and it must be conatins in the database so first it will checks that.
//
//        if (AuthHeader == null || !AuthHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        if(AuthHeader!=null && AuthHeader.startsWith("Bearer ")){
//            token=AuthHeader.substring(7);
//
//            //here the token will come with Bearer and token(Bearer+token) here we have to remove the token means
//            //i wnat the string who starts with the token so i used the substring from the index 7 means "Bearer " it will occupies
//            //upto 6th index and then from 7th index the token will starts thats why i took the substring from 7th index
//
//            userName= JWTService.extratctUSername(token);
//
//            //here why we import th extractusername from the "JWTService" means the methods related to jwt we all keep them in the JWTService class
//
//            if(userName!=null && SecurityContextHolder.getContext().getAuthentication()==null){
//                //the above condition checks the username !== nul and the user authnticated or not if user authenticated why we need to authenticate thats why we arote this condtion
//
//                UserDetails userDetails = userservice.loadUserByUsername(userName);
//
//                //it will checks the username is there or not in the database by using the myuserdetailservice which return the userDetails
//                //it will return the userdetails like password,username,getAuthorities
//                if(JWTService.validateToken(token,userDetails)){
//                    //now we will checks the condition that the token and userdetails are valid or not by usig the custom method
//                    //the userdetails we are validating that comes through username thats why we use username as first check
//
//                    UsernamePasswordAuthenticationToken authtoken = new UsernamePasswordAuthenticationToken(
//                            userDetails,null,userDetails.getAuthorities()
//                    );
//
//                    //it will validates the userdetails and credentials means the other methods in the userDetails like (isaccountlocked,isaccountexpired etc)
//                    //and also it validates the authorities
//
//                    authtoken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//                    //here builddetails take the paramenter "httpservletrequest"
//                    //here in the request along with the jwttoken we also get the payload or somthing that all we will set into the authtoken
//
//                    SecurityContextHolder.getContext().setAuthentication(authtoken);
//
//                    // it will set the authntication like it gives the authentication
//
//                }
//            }
//            filterChain.doFilter(request,response);
//
//            //here after this filter do the next filter with the request and reponse the next filter is usernamepasswordauthenticationfilterchain
//        }
//    }
//}
package com.ramlokesh.ecommerce.config;

import com.ramlokesh.ecommerce.Service.JWTService;
import com.ramlokesh.ecommerce.Service.Myuserdetailservice;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private Myuserdetailservice userservice;

    @Autowired
    private JWTService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        System.out.println("========== JWT FILTER ==========");
        System.out.println("METHOD: " + request.getMethod());
        System.out.println("URI: " + request.getRequestURI());

        String authHeader = request.getHeader("Authorization");

        System.out.println("AUTH HEADER: " + authHeader);

        // 1. Check whether Authorization header exists
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            System.out.println("NO BEARER TOKEN");

            filterChain.doFilter(request, response);
            return;
        }

        // 2. Remove "Bearer " from the header
        String token = authHeader.substring(7);

        System.out.println("TOKEN RECEIVED");

        try {

            // 3. Extract username/email from JWT
            String userName = jwtService.extractUsername(token);

            System.out.println("USERNAME FROM TOKEN: " + userName);

            // 4. Check that authentication has not already been created
            if (userName != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                // 5. Find user from database
                UserDetails userDetails =
                        userservice.loadUserByUsername(userName);

                System.out.println(
                        "USER FOUND: " + userDetails.getUsername()
                );

                // 6. Validate JWT
                boolean valid =
                        jwtService.validateToken(token, userDetails);

                System.out.println("TOKEN VALID: " + valid);

                if (valid) {

                    // 7. Create authenticated object
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    // 8. Attach request details
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    // 9. Tell Spring Security that user is authenticated
                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authToken);

                    System.out.println(
                            "AUTHENTICATION SET SUCCESSFULLY"
                    );
                }
            }

        } catch (Exception e) {

            System.out.println("========== JWT ERROR ==========");
            e.printStackTrace();
        }

        // 10. Continue to the next filter
        filterChain.doFilter(request, response);
    }
}