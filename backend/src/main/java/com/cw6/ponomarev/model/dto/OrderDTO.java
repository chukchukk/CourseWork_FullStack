package com.cw6.ponomarev.model.dto;

import com.cw6.ponomarev.model.enumeration.OrderStatus;
import com.cw6.ponomarev.model.enumeration.OrderType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class OrderDTO {

	private Long id;

	private String title;

	private Long priority;

	private OrderType type;

	private OrderStatus status;

	private String inVersion;

	private String description;

	private LocalDateTime createdDate;

	private LocalDateTime updatedDate;

	private UserDTO creatorUser;

	private UserDTO worksUser;

	private ProjectDTO project;

	private Set<OrderStatus> availableStatuses;

}
