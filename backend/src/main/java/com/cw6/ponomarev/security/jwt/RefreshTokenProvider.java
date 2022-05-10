package com.cw6.ponomarev.security.jwt;

import com.cw6.ponomarev.model.entity.RefreshToken;
import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.repository.RefreshTokenRepository;
import com.cw6.ponomarev.repository.UserEntityRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.cw6.ponomarev.security.jwt.SecurityProperties.*;

@Component
@AllArgsConstructor
public class RefreshTokenProvider {

	private UserEntityRepository userRepository;

	private RefreshTokenRepository refreshTokenRepository;

	private JWTTokenProvider jwtTokenProvider;

	/**
	 * Create refresh token.
	 *
	 * @param email the email
	 * @return the refresh token
	 */
	@Transactional
	public RefreshToken createRefreshToken(String email) {
		UserEntity userEntity = userRepository.getByEmail(email);
		RefreshToken refreshToken = new RefreshToken()
				.setUser(userEntity)
				.setToken(UUID.randomUUID().toString())
				.setExpirationDate(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME));
		refreshTokenRepository.deleteAllByUser(userEntity);
		refreshTokenRepository.save(refreshToken);
		return refreshToken;
	}

	public RefreshToken verifyTokenExpirationDate(RefreshToken refreshToken) {
		Date now = new Date();
		if (now.after(refreshToken.getExpirationDate())) {
			refreshTokenRepository.delete(refreshToken);
			return null;
		}
		refreshToken
				.setExpirationDate(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))
				.setToken(UUID.randomUUID().toString());
		refreshTokenRepository.save(refreshToken);
		return refreshToken;
	}

	@Transactional
	public String updateTokens(HttpServletRequest request, HttpServletResponse response) {
		String oldAccessToken = request.getHeader(HEADER_ACCESS_TOKEN);
		String oldRefreshToken = request.getHeader(HEADER_REFRESH_TOKEN);
		if (oldAccessToken != null && oldRefreshToken != null) {
			RefreshToken refreshToken = refreshTokenRepository.findByToken(oldRefreshToken);
			if (refreshToken == null) {
				String email = jwtTokenProvider.decodeJWT(oldAccessToken);
				UserEntity userEntity = userRepository.getByEmail(email);
				if (userEntity != null)
					refreshTokenRepository.deleteAllByUser(userEntity);
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such token in the database");
			}
			refreshToken = verifyTokenExpirationDate(refreshToken);
			if (refreshToken == null)
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Refresh token was expired");
			UserEntity userEntity = refreshToken.getUser();
			List<GrantedAuthority> authorities = userEntity.getRoles().stream()
					.map(role -> new SimpleGrantedAuthority(role.getAuthority()))
					.collect(Collectors.toList());
			String token = jwtTokenProvider.createJWTToken(userEntity.getEmail(), authorities);
			response.addHeader(HEADER_ACCESS_TOKEN, TOKEN_PREFIX + token);
			response.addHeader(HEADER_REFRESH_TOKEN, refreshToken.getToken());
			return token;
		}
		return null;
	}

}