package com.cw6.ponomarev.service;

import com.cw6.ponomarev.mapper.OrderMapper;
import com.cw6.ponomarev.mapper.ProjectMapper;
import com.cw6.ponomarev.mapper.UserEntityMapper;
import com.cw6.ponomarev.model.dto.ChangeOrderByCreatorDTO;
import com.cw6.ponomarev.model.dto.ChangeOrderStatusDTO;
import com.cw6.ponomarev.model.dto.CreateOrderDTO;
import com.cw6.ponomarev.model.dto.OrderDTO;
import com.cw6.ponomarev.model.entity.Order;
import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.repository.OrderRepository;
import com.cw6.ponomarev.repository.ProjectRepository;
import com.cw6.ponomarev.repository.UserEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

	public List<OrderDTO> getAllUserOrders(UserEntity user) {
		return orderRepository.findAllByWorksUser(user).stream()
				.map(o -> orderMapper.orderEntityToOrderDTO(o, userEntityMapper, projectMapper))
				.collect(Collectors.toList());
	}

	public void changeOrderStatus(ChangeOrderStatusDTO dto) {
		Order order = orderRepository.findById(dto.getOrderId()).orElseThrow();
		order
				.setStatus(dto.getStatus())
				.setUpdatedDate(LocalDateTime.now());
		orderRepository.save(order);
	}

	public List<OrderDTO> getAllCreatorOrders(UserEntity user) {
		return orderRepository.findAllByCreatorUser(user).stream()
				.map(o -> orderMapper.orderEntityToOrderDTO(o, userEntityMapper, projectMapper))
				.collect(Collectors.toList());
	}

	public void changeOrderFields(ChangeOrderByCreatorDTO dto) {
		Order order = orderRepository.getById(dto.getOrderId());
		order.setTitle(dto.getTitle())
				.setPriority(dto.getPriority())
				.setInVersion(dto.getInVersion())
				.setDescription(dto.getDescription())
				.setWorksUser(userEntityRepository.getById(dto.getWorksUserId()));
		orderRepository.save(order);
	}
}
