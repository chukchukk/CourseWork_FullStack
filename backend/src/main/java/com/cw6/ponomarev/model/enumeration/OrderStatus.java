package com.cw6.ponomarev.model.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum OrderStatus {
	OPEN,
	IN_PROGRESS,
	REOPENED,
	RESOLVED,
	CLOSED;
}
