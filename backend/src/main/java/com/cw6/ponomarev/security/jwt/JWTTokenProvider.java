package com.cw6.ponomarev.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.model.enumeration.Role;
import com.cw6.ponomarev.repository.UserEntityRepository;
import lombok.AllArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.*;

import static com.cw6.ponomarev.security.jwt.SecurityProperties.ACCESS_TOKEN_EXPIRATION_TIME;
import static com.cw6.ponomarev.security.jwt.SecurityProperties.SECRET;
import static com.cw6.ponomarev.security.jwt.SecurityProperties.TOKEN_PREFIX;

@Component
@AllArgsConstructor
public class JWTTokenProvider {

	private final UserEntityRepository userRepository;

	public String createJWTToken(String username, Collection<GrantedAuthority> authorities) {
		String userRole = Role.USER.getAuthority();
		String token = JWT.create()
				.withSubject(username)
				.withClaim("role", userRole)
				.withIssuedAt(new Date(System.currentTimeMillis()))
				.withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
				.sign(Algorithm.HMAC512(SECRET.getBytes()));
		return token;
	}

	public UserEntity getUserFromToken(String token) {
		String userName = JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
				.build()
				.verify(token.replace(TOKEN_PREFIX, ""))
				.getSubject();
		return userRepository.getByEmail(userName);
	}

	public String getRoleFromToken(String token) {
		return JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
				.build()
				.verify(token.replace(TOKEN_PREFIX, ""))
				.getClaim("role").asString();
	}

	public String decodeJWT(String jwt){
		String[] chunks = jwt.split("\\.");
		Base64.Decoder decoder = Base64.getDecoder();
		String json = new String(decoder.decode(chunks[1]));
		try {
			JSONObject jsonObject = new JSONObject(json);
			return jsonObject.getString("sub");
		} catch (JSONException e) {
			e.printStackTrace();
			return null;
		}
	}
}