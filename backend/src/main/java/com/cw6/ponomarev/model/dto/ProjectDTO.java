package com.cw6.ponomarev.model.dto;

import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.model.enumeration.ProjectStatus;
import com.cw6.ponomarev.model.enumeration.ProjectType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class ProjectDTO {

	private Long id;

	private String name;

	private String code;

	private ProjectType type;

	private ProjectStatus status;

	private Long creatorId;

	private String creatorUserName;

	private LocalDateTime createdDate;

	private String description;

	private Set<UserDTO> users = new HashSet<>();

}
