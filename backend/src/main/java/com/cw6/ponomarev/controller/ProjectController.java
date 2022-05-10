package com.cw6.ponomarev.controller;

import com.cw6.ponomarev.model.dto.CreateProjectDTO;
import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.model.enumeration.ProjectType;
import com.cw6.ponomarev.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("/projects")
public class ProjectController {

	private final ProjectService projectService;

	@PostMapping("/create")
	public ResponseEntity<Void> createNewProject(@RequestBody CreateProjectDTO dto,
												 @AuthenticationPrincipal UserEntity user) {
		try {
			projectService.createProject(dto, user);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/types")
	public ResponseEntity<List<String>> getProjectTypes() {
		return ResponseEntity.ok(Arrays.stream(ProjectType.values()).map(ProjectType::getUiValue).collect(Collectors.toList()));
	}

}
