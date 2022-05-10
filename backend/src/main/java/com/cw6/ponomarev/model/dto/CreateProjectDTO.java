package com.cw6.ponomarev.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateProjectDTO {

	private String name;

	private String code;

	private String type;

	private String description;

}
