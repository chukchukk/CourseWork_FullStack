package com.cw6.ponomarev.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegistrationDTO {

	private String fullName;

	private String email;

	private String telephoneNumber;

	private String password;

}
