package com.cw6.ponomarev.model.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Optional;

@Getter
@AllArgsConstructor
public enum ProjectType {
	BUSINESS("Бизнес"),
	SOFTWARE("Софт");

	private final String uiValue;

	public static Optional<ProjectType> getByUIValue(String uiValue) {
		return Arrays.stream(ProjectType.values()).filter(v -> v.getUiValue().equals(uiValue)).findFirst();
	}

}
