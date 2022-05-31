package com.cw6.ponomarev.controller;

import com.cw6.ponomarev.model.dto.ChangeOrderByCreatorDTO;
import com.cw6.ponomarev.model.dto.ChangeOrderStatusDTO;
import com.cw6.ponomarev.model.dto.CreateOrderDTO;
import com.cw6.ponomarev.model.dto.OrderDTO;
import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.model.enumeration.OrderType;
import com.cw6.ponomarev.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/orders")
public class OrderController {

	private final OrderService orderService;

	@GetMapping("/types")
	public OrderType[] getOrderTypes() {
		return OrderType.values();
	}

	@PostMapping("/createNew")
	public ResponseEntity<Void> createNewOrder(@RequestBody CreateOrderDTO dto, @AuthenticationPrincipal UserEntity user) {
		orderService.createNewOrder(dto, user);
		return ResponseEntity.ok(null);
	}

	@GetMapping
	public ResponseEntity<List<OrderDTO>> getAll() {
		return ResponseEntity.ok(orderService.getAll());
	}

	@GetMapping("/byUser")
	public ResponseEntity<List<OrderDTO>> getAllUserOrders(@AuthenticationPrincipal UserEntity user) {
		return ResponseEntity.ok(orderService.getAllUserOrders(user));
	}

	@GetMapping("/byCreator")
	public ResponseEntity<List<OrderDTO>> getAllCreatorOrders(@AuthenticationPrincipal UserEntity user) {
		return ResponseEntity.ok(orderService.getAllCreatorOrders(user));
	}

	@PostMapping("/changeOrderStatus")
	public ResponseEntity<Void> changeOrderStatus(@RequestBody ChangeOrderStatusDTO dto) {
		orderService.changeOrderStatus(dto);
		return ResponseEntity.ok(null);
	}

	@PostMapping("/changeOrderByCreator")
	public ResponseEntity<Void> changeOrderByCreator(@RequestBody ChangeOrderByCreatorDTO dto) {
		orderService.changeOrderFields(dto);
		return ResponseEntity.ok(null);
	}

}
