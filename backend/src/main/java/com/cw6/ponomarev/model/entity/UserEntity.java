package com.cw6.ponomarev.model.entity;

import com.cw6.ponomarev.model.enumeration.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Table(name = "USERS")
public class UserEntity extends BaseEntity implements UserDetails {

	private String email;

	@Column(name = "FULL_NAME")
	private String fullName;

	@Column(name = "TELEPHONE_NUMBER")
	private String telephoneNumber;

	private String password;

	@ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
	@CollectionTable(name = "ROLES", joinColumns = @JoinColumn(name = "USER_ID"))
	@Enumerated(EnumType.STRING)
	private Set<Role> roles;

	@JsonIgnore
	@ManyToMany(mappedBy = "users", fetch = FetchType.EAGER)
	private Set<Project> projects = new HashSet<>();

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return roles;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}