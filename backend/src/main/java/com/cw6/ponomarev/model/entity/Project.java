package com.cw6.ponomarev.model.entity;

import com.cw6.ponomarev.model.enumeration.ProjectType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "PROJECT")
@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
public class Project extends BaseEntity {

	private String name;

	private String code;

	@Enumerated(EnumType.STRING)
	private ProjectType type;

	@ManyToOne
	@JoinColumn(name = "CREATOR_USER_ID")
	private UserEntity creatorUser;

	private LocalDateTime createdDate;

	private LocalDateTime lastUpdatedDate;

	private Boolean active;

	private String description;

	@ManyToMany
	@JoinTable(
			name = "PROJECT_USER",
			joinColumns = @JoinColumn(name = "PROJECT_ID"),
			inverseJoinColumns = @JoinColumn(name = "USER_ID")
	)
	private Set<UserEntity> users = new HashSet<>();

}
