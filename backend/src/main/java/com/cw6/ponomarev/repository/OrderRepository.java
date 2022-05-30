package com.cw6.ponomarev.repository;

import com.cw6.ponomarev.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
