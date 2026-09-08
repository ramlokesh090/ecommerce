package com.ramlokesh.ecommerce.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {
    private static String secretKey=""; //here we have bulild the secret key

    public JWTService() throws NoSuchAlgorithmException {
        try {
            KeyGenerator Keygen = KeyGenerator.getInstance("HmacSHA256");
            //it will generate the key but we want the key in the string format thats why we use the Bas64.getencoder()
            SecretKey sk=Keygen.generateKey();
            secretKey=Base64.getEncoder().encodeToString(sk.getEncoded());
        }
        catch( NoSuchAlgorithmException e){
            throw new NoSuchAlgorithmException("no Such Alogorithm found");
        }
    }




    public String generateToken(String email) {

        Map<String,Object> claims=new HashMap<>();

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))

                //.expiration(new Date(System.currentTimeMillis()+60*60*30))

                // other we will use more expiration time like 1week or 1month our wish
                // here in the realtime the expiration we will use most span time because the token will be within allocated to that user right
                //so need to expiration if you want add it but for this time i am commenting it

                .and() //convert into the payload or jwt builder
                .signWith(getKey())
                //here we have pass the secret key for the building of the signature thatreturn type is "Key"
                //thats why we create the new method called getkey which convert the secret into type "key"
                .compact();
    }
    private static SecretKey getKey(){
        byte[] bytes= Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(bytes);
        //here hmacshaKeyFor accepts the byte format so we have to convert the secretkey into bytes
        //so for that we use Decoders.BASE64.decode(secretket) it will converts the string into byte[] array
    }
    public static String extratctUSername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    private static <T> T extractClaim(String token, Function<Claims, T> claimResolver){
        final Claims claims=extractAllClaims(token);
        return claimResolver.apply(claims);
    }
    private static Claims extractAllClaims(String token){
        return  Jwts.parser()
                .verifyWith(getKey())
                .build().parseSignedClaims(token).getPayload();
    }
    public static boolean validateToken(String token, UserDetails userDetails) {
        final String userName=extratctUSername(token);
        return (userName.equals(userDetails.getUsername()) /*&& !isTokenExpired(token)*/);
        //we didnt using the expration thts is why i commented the isTokenexpired okay
        //currently we not giving any expiring of the token so dont add this,for present i commenting it.

    }
    private static boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }
    private static Date extractExpiration(String token){
        return extractClaim(token,Claims::getExpiration);
    }
}
