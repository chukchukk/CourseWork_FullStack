package com.cw6.ponomarev.repository;

import com.cw6.ponomarev.model.entity.RefreshToken;
import com.cw6.ponomarev.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

	RefreshToken findByToken(String token);

	void deleteAllByUser(UserEntity userEntity);

	List<RefreshToken> findByUser(UserEntity userEntity);
}