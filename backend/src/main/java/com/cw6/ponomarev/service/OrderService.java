package com.cw6.ponomarev.service;

import com.cw6.ponomarev.mapper.OrderMapper;
import com.cw6.ponomarev.mapper.ProjectMapper;
import com.cw6.ponomarev.mapper.UserEntityMapper;
import com.cw6.ponomarev.model.dto.CreateOrderDTO;
import com.cw6.ponomarev.model.dto.OrderDTO;
import com.cw6.ponomarev.model.entity.Order;
import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.repository.OrderRepository;
import com.cw6.ponomarev.repository.ProjectRepository;
import com.cw6.ponomarev.repository.UserEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

	private final ProjectRepository projectRepository;

	private final OrderRepository orderRepository;

	private final UserEntityRepository userEntityRepository;

	private final OrderMapper orderMapper;

	private final UserEntityMapper userEntityMapper;

	private final ProjectMapper projectMapper;

	public void createNewOrder(CreateOrderDTO dto, UserEntity creatorUser) {
		Order order = orderMapper.createOrderDTOToOrderEntity(dto,
				creatorUser,
				userEntityRepository,
				projectRepository);
		orderRepository.save(order);
	}

	public List<OrderDTO> getAll() {
		return orderRepository.findAll().stream()
				.map(o -> orderMapper.orderEntityToOrderDTO(o, userEntityMapper, projectMapper))
				.collect(Collectors.toList());
	}
}
