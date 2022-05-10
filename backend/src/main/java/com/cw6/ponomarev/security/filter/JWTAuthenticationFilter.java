package com.cw6.ponomarev.security.filter;

import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.security.jwt.JWTTokenProvider;
import com.cw6.ponomarev.security.jwt.RefreshTokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Collection;

import static com.cw6.ponomarev.security.jwt.SecurityProperties.*;

@AllArgsConstructor
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private AuthenticationManager authenticationManager;

	private JWTTokenProvider jwtTokenProvider;

	private RefreshTokenProvider refreshTokenProvider;

	@SneakyThrows
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
												HttpServletResponse response) throws AuthenticationException {
		UserEntity user = new ObjectMapper().readValue(request.getInputStream(), UserEntity.class);
		return authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(user, user.getPassword(), user.getRoles())
		);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request,
											HttpServletResponse response,
											FilterChain chain,
											Authentication authResult) {
		String username = ((User) authResult.getPrincipal()).getUsername();
		Collection<GrantedAuthority> authorities = ((User) authResult.getPrincipal()).getAuthorities();
		String accessToken = jwtTokenProvider.createJWTToken(username, authorities);
		String refreshToken = refreshTokenProvider.createRefreshToken(username).getToken();
		response.addHeader(HEADER_ACCESS_TOKEN, TOKEN_PREFIX + accessToken);
		response.addHeader(HEADER_REFRESH_TOKEN, refreshToken);
		response.addHeader("Access-Control-Expose-Headers", HEADER_ACCESS_TOKEN + "," + HEADER_REFRESH_TOKEN);
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
		throw new UnsupportedEncodingException();
	}

}
