package com.cw6.ponomarev.service;

import com.cw6.ponomarev.model.dto.RegistrationDTO;
import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.model.enumeration.Role;
import com.cw6.ponomarev.repository.UserEntityRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserEntityRepository userRepository;

	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	public void addNewUser(RegistrationDTO dto) {
		Optional<UserEntity> dbUserByEmail = userRepository.findByEmailOrTelephoneNumber(
				dto.getEmail(),
				dto.getTelephoneNumber()
		);
		if (dbUserByEmail.isEmpty()) {
			UserEntity user = new UserEntity()
					.setEmail(dto.getEmail())
					.setFullName(dto.getFullName())
					.setTelephoneNumber(dto.getTelephoneNumber())
					.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()))
					.setRoles(Collections.singleton(Role.USER));
			userRepository.save(user);
		} else {
			throw new UnsupportedOperationException();
		}
	}

}
