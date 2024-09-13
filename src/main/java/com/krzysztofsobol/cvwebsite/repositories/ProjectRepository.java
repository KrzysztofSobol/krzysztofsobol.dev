package com.krzysztofsobol.cvwebsite.repositories;

import com.krzysztofsobol.cvwebsite.domain.dto.entity.ProjectEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<ProjectEntity, Long> {
}
