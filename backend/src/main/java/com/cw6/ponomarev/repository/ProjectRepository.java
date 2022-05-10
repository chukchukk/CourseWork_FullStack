package com.cw6.ponomarev.repository;

import com.cw6.ponomarev.model.entity.Project;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

	Optional<Project> findByCode(@NonNull String code);

}
