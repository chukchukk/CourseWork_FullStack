package com.cw6.ponomarev.security.jwt;

import lombok.experimental.UtilityClass;

@UtilityClass
public class SecurityProperties {

	public static final String SECRET = "My_Secret_Key";

	public static final int ACCESS_TOKEN_EXPIRATION_TIME = 3000000;

	public static final int REFRESH_TOKEN_EXPIRATION_TIME = 36000000;

	public static final String TOKEN_PREFIX = "Bearer_";

	public static final String HEADER_ACCESS_TOKEN = "AccessToken";

	public static final String HEADER_REFRESH_TOKEN = "RefreshToken";
}
