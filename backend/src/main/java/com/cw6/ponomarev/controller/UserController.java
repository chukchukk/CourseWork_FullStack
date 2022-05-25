package com.cw6.ponomarev.controller;

import com.cw6.ponomarev.model.dto.RegistrationDTO;
import com.cw6.ponomarev.model.dto.UserDTO;
import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/clients")
public class UserController {

	private final UserService userService;

	@PostMapping("/registration")
	public ResponseEntity<Void> registration(@RequestBody RegistrationDTO dto) {
		try {
			userService.addNewUser(dto);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/currentUserInfo")
	public ResponseEntity<UserDTO> getCurrentUserInfo(@AuthenticationPrincipal UserEntity user) {
		return ResponseEntity.ok(userService.getCurrentUserInfo(user));
	}

}
