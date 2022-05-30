package com.cw6.ponomarev.model.dto;

import com.cw6.ponomarev.model.enumeration.OrderType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateOrderDTO {

	private String projectCode;

	private String title;

	private Long priority;

	private OrderType type;

	private String inVersion;

	private String description;

	private Long worksUserId;
}
