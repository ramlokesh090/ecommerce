package com.ramlokesh.ecommerce.Repository;

import com.ramlokesh.ecommerce.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface userRepo extends JpaRepository<Users,Long> {
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(Long phoneNumber);
    Optional<Users> findByEmailAndPassword(
            String email,
            String password
    );
    boolean existsByEmailAndPassword(
            String email,
            String password
    );

    Optional<Users> findByEmail(String email);
    /*
    how spring knows existsbyphonenumber and existsbyemail?

    because it will checks like exists + by +email which is mentioned in the entity and same as phonenumber
    if you give some other names like existsbyabc it looks like exists+by+abc,but here abc field is not there in the entity
    so it throws repository error
     */
}
