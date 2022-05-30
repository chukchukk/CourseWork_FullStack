package com.cw6.ponomarev.model.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Set;

import static com.cw6.ponomarev.model.enumeration.OrderStatus.*;

@Getter
@AllArgsConstructor
public enum OrderStatusToAvailable {
	OPEN_AVAILABLE(OPEN, Set.of(RESOLVED, IN_PROGRESS, CLOSED)),
	IN_PROGRESS_AVAILABLE(IN_PROGRESS, Set.of(OPEN, CLOSED, RESOLVED)),
	REOPENED_AVAILABLE(REOPENED, Set.of(RESOLVED, IN_PROGRESS, CLOSED)),
	RESOLVED_AVAILABLE(RESOLVED, Set.of(REOPENED, CLOSED)),
	CLOSED_AVAILABLE(CLOSED, Set.of(REOPENED));

	private OrderStatus current;

	private Set<OrderStatus> availableStatuses;

	public static Set<OrderStatus> getAvailableByStatus(OrderStatus status) {
		return Arrays.stream(OrderStatusToAvailable.values())
				.filter(orderStatusToAvailable -> orderStatusToAvailable.getCurrent().equals(status))
				.findFirst()
				.map(OrderStatusToAvailable::getAvailableStatuses)
				.orElseThrow();
	}
}
