package com.cw6.ponomarev.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChangeOrderByCreatorDTO {

	private Long orderId;

	private String title;

	private Long priority;

	private String inVersion;

	private String description;

	private Long worksUserId;

}
