package com.cw6.ponomarev.repository;

import com.cw6.ponomarev.model.entity.Order;
import com.cw6.ponomarev.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

	List<Order> findAllByWorksUser(UserEntity user);

	List<Order> findAllByCreatorUser(UserEntity user);

}
