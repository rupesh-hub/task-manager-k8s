package com.alfaeays.user.repository;

import com.alfaeays.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT U FROM User U WHERE LOWER(U.email) = LOWER(:email)")
    Optional<User> findByEmail(String email);

}