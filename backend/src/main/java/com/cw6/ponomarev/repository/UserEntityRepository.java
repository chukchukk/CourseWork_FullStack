package com.cw6.ponomarev.repository;

import com.cw6.ponomarev.model.entity.UserEntity;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {

	UserEntity findUserById(Long id);

	Optional<UserEntity> findByEmail(@NonNull String email);

	Optional<UserEntity> findByEmailOrTelephoneNumber(@NonNull String email, @NonNull String telephoneNumber);

	UserEntity getByEmail(@NonNull String email);

	@Query("select u from UserEntity u where u not in :collection")
	List<UserEntity> findAllNotIn(@Param("collection") Collection<UserEntity> collection);

}