package com.cw6.ponomarev.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "REFRESH_TOKENS")
@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
public class RefreshToken extends BaseEntity {

	@ManyToOne
	@JoinColumn(name = "USER_ID")
	@ToString.Exclude
	private UserEntity user;

	private String token;

	@Column(name = "EXPIRATION_DATE")
	private Date expirationDate;

}