package com.cw6.ponomarev.mapper;

import com.cw6.ponomarev.model.dto.UserDTO;
import com.cw6.ponomarev.model.entity.UserEntity;
import lombok.NonNull;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface UserEntityMapper {

	@Mapping(target = "id", expression = "java(user.getId())")
	UserDTO userEntityToUserDTO(@NonNull UserEntity user);

}
