package com.cw6.ponomarev.mapper;

import com.cw6.ponomarev.model.dto.CreateOrderDTO;
import com.cw6.ponomarev.model.dto.OrderDTO;
import com.cw6.ponomarev.model.entity.Order;
import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.model.enumeration.OrderStatus;
import com.cw6.ponomarev.model.enumeration.OrderStatusToAvailable;
import com.cw6.ponomarev.repository.ProjectRepository;
import com.cw6.ponomarev.repository.UserEntityRepository;
import lombok.NonNull;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.LocalDateTime;

@Mapper(imports = {LocalDateTime.class, UserEntityRepository.class,
		ProjectRepository.class, OrderStatus.class,
		UserEntityMapper.class, ProjectMapper.class, OrderStatusToAvailable.class})
public abstract class OrderMapper {

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "status", expression = "java(OrderStatus.OPEN)")
	@Mapping(target = "createdDate", expression = "java(LocalDateTime.now())")
	@Mapping(target = "updatedDate", expression = "java(LocalDateTime.now())")
	@Mapping(target = "creatorUser", expression = "java(creatorUser)")
	@Mapping(target = "worksUser", expression = "java(userEntityRepository.getById(dto.getWorksUserId()))")
	@Mapping(target = "project", expression = "java(projectRepository.findByCode(dto.getProjectCode()).get())")
	public abstract Order createOrderDTOToOrderEntity(@NonNull CreateOrderDTO dto,
													  UserEntity creatorUser,
													  @Context UserEntityRepository userEntityRepository,
													  @Context ProjectRepository projectRepository);

	@Mapping(target = "id", expression = "java(order.getId())")
	@Mapping(target = "creatorUser", expression = "java(userEntityMapper.userEntityToUserDTO(order.getCreatorUser()))")
	@Mapping(target = "worksUser", expression = "java(userEntityMapper.userEntityToUserDTO(order.getWorksUser()))")
	@Mapping(target = "project", expression = "java(projectMapper.projectEntityToProjectDTO(order.getProject(), userEntityMapper))")
	@Mapping(target = "availableStatuses", expression = "java(OrderStatusToAvailable.getAvailableByStatus(order.getStatus()))")
	public abstract OrderDTO orderEntityToOrderDTO(@NonNull Order order,
												   @Context UserEntityMapper userEntityMapper,
												   @Context ProjectMapper projectMapper);

}
