package com.cw6.ponomarev.security;

import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.repository.UserEntityRepository;
import com.cw6.ponomarev.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

	private final UserEntityRepository userEntityRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		UserEntity registeredUser = userEntityRepository.getByEmail(email);
		if (registeredUser == null)
			throw new UsernameNotFoundException("User not found");
		return new User(registeredUser.getEmail(), registeredUser.getPassword(), registeredUser.getRoles());
	}
}
