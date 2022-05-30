package com.cw6.ponomarev.model.entity;

import com.cw6.ponomarev.model.enumeration.OrderStatus;
import com.cw6.ponomarev.model.enumeration.OrderType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ORDERS")
@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
public class Order extends BaseEntity{

	private String title;

	private Long priority;

	@Enumerated(EnumType.STRING)
	private OrderType type;

	@Enumerated(EnumType.STRING)
	private OrderStatus status;

	@Column(name = "IN_VERSION")
	private String inVersion;

	private String description;

	@Column(name = "CREATED_DATE")
	private LocalDateTime createdDate;

	@Column(name = "UPDATED_DATE")
	private LocalDateTime updatedDate;

	@ManyToOne
	@JoinColumn(name = "CREATOR_USER_ID")
	private UserEntity creatorUser;

	@ManyToOne
	@JoinColumn(name = "WORKS_USER_ID")
	private UserEntity worksUser;

	@ManyToOne
	@JoinColumn(name = "PROJECT_ID")
	private Project project;

}
