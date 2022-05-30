package com.cw6.ponomarev.service;

import com.cw6.ponomarev.mapper.ProjectMapper;
import com.cw6.ponomarev.mapper.UserEntityMapper;
import com.cw6.ponomarev.model.dto.CreateProjectDTO;
import com.cw6.ponomarev.model.dto.ProjectDTO;
import com.cw6.ponomarev.model.dto.UserDTO;
import com.cw6.ponomarev.model.entity.Project;
import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.model.enumeration.ProjectStatus;
import com.cw6.ponomarev.model.enumeration.ProjectType;
import com.cw6.ponomarev.repository.ProjectRepository;
import com.cw6.ponomarev.repository.UserEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

	private final ProjectRepository projectRepository;

	private final ProjectMapper projectMapper;

	private final UserEntityMapper userEntityMapper;

	private final UserEntityRepository userEntityRepository;

	@Transactional
	public void createProject(CreateProjectDTO dto, UserEntity user) {
		Optional<Project> projectByCode = projectRepository.findByCode(dto.getCode());
		if (projectByCode.isEmpty()) {
			Project project = new Project()
					.setName(dto.getName())
					.setCode(dto.getCode())
					.setType(ProjectType.getByUIValue(dto.getType()).get())
					.setCreatorUser(user)
					.setCreatedDate(LocalDateTime.now())
					.setLastUpdatedDate(LocalDateTime.now())
					.setActive(true)
					.setDescription(dto.getDescription())
					.setStatus(ProjectStatus.OPEN);
			project.getUsers().add(user);
			projectRepository.save(project);
		} else {
			throw new EntityExistsException("Project with code is already exists");
		}
	}

	public List<ProjectDTO> getAllNewProjects() {
		return projectRepository.findAllByStatus(ProjectStatus.OPEN).stream()
				.map(pr -> projectMapper.projectEntityToProjectDTO(pr, userEntityMapper))
				.collect(Collectors.toList());
	}

	public List<ProjectDTO> getProjectsByUser(UserEntity user) {
		return projectRepository.findAllByUsersContains(user).stream()
				.map(pr -> projectMapper.projectEntityToProjectDTO(pr, userEntityMapper))
				.collect(Collectors.toList());
	}

	public List<UserDTO> getAvailableUsersForProject(Long projectId) {
		Project project = projectRepository.getById(projectId);
		return userEntityRepository.findAllNotIn(project.getUsers())
				.stream()
				.map(u -> userEntityMapper.userEntityToUserDTO(u))
				.collect(Collectors.toList());
	}

	public void addNewUser(Long projectId, Long userId) {
		Project project = projectRepository.getById(projectId);
		project.getUsers().add(userEntityRepository.getById(userId));
		projectRepository.save(project);
	}

	public void deleteUser(Long projectId, Long userId) {
		Project project = projectRepository.findById(projectId).orElseThrow();
		UserEntity userEntity = userEntityRepository.findById(userId).orElseThrow();
		project.getUsers().remove(userEntity);
		projectRepository.save(project);
	}
}
