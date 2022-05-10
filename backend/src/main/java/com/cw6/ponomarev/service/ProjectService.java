package com.cw6.ponomarev.service;

import com.cw6.ponomarev.model.dto.CreateProjectDTO;
import com.cw6.ponomarev.model.entity.Project;
import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.model.enumeration.ProjectType;
import com.cw6.ponomarev.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

	private final ProjectRepository projectRepository;

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
					.setDescription(dto.getDescription());
			project.getUsers().add(user);
			projectRepository.save(project);
		} else {
			throw new EntityExistsException("Project with code is already exists");
		}
	}
}
