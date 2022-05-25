package com.cw6.ponomarev.repository;

import com.cw6.ponomarev.model.entity.Project;
import com.cw6.ponomarev.model.entity.UserEntity;
import com.cw6.ponomarev.model.enumeration.ProjectStatus;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

	Optional<Project> findByCode(@NonNull String code);

	List<Project> findAllByStatus(@NonNull ProjectStatus status);

	List<Project> findAllByCreatorUser(UserEntity user);

}
