package com.cw6.ponomarev.mapper;

import com.cw6.ponomarev.model.dto.ProjectDTO;
import com.cw6.ponomarev.model.entity.Project;
import lombok.NonNull;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.stream.Collectors;

@Mapper(imports = Collectors.class)
public abstract class ProjectMapper {

	@Mapping(source = "project.creatorUser.fullName", target = "creatorUserName")
	@Mapping(target = "id", expression = "java(project.getId())")
	@Mapping(target = "creatorId", expression = "java(project.getCreatorUser().getId())")
	@Mapping(target = "users", expression = "java(project.getUsers().stream().map(userEntityMapper::userEntityToUserDTO).collect(Collectors.toSet()))")
	public abstract ProjectDTO projectEntityToProjectDTO(@NonNull Project project, @Context UserEntityMapper userEntityMapper);

}
