package com.krzysztofsobol.cvwebsite.services;

import com.krzysztofsobol.cvwebsite.domain.dto.entity.ProjectEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ProjectService {
    List<ProjectEntity> findAll();

    ProjectEntity save(ProjectEntity projectEntity);
    Boolean exists(Long id);
    ProjectEntity update(Long id, ProjectEntity projectEntity);
    void delete(Long id);
}
