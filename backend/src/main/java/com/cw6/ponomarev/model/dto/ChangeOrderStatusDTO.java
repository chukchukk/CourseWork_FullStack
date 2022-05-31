package com.cw6.ponomarev.model.dto;

import com.cw6.ponomarev.model.enumeration.OrderStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChangeOrderStatusDTO {

	private Long orderId;

	private OrderStatus status;
}
