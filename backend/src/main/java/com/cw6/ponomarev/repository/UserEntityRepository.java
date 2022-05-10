package com.cw6.ponomarev.repository;

import com.cw6.ponomarev.model.entity.UserEntity;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {

	UserEntity findUserById(Long id);

	Optional<UserEntity> findByEmail(@NonNull String email);

	Optional<UserEntity> findByEmailOrTelephoneNumber(@NonNull String email, @NonNull String telephoneNumber);

	UserEntity getByEmail(@NonNull String email);
}