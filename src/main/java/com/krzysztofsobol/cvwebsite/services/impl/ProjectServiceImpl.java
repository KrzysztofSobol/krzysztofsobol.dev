package com.krzysztofsobol.cvwebsite.services.impl;

import com.krzysztofsobol.cvwebsite.domain.dto.entity.ProjectEntity;
import com.krzysztofsobol.cvwebsite.repositories.ProjectRepository;
import com.krzysztofsobol.cvwebsite.services.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public List<ProjectEntity> findAll() {
        return StreamSupport.stream(projectRepository.findAll().spliterator(), false).collect(Collectors.toList());
    }

    @Override
    public ProjectEntity save(ProjectEntity projectEntity) {
        return projectRepository.save(projectEntity);
    }

    @Override
    public Boolean exists(Long id) {
        return projectRepository.existsById(id);
    }

    public ProjectEntity update(Long id, ProjectEntity projectEntity) {
        return projectRepository.findById(id).map(existingProject ->{
            Optional.ofNullable(projectEntity.getName()).ifPresent(existingProject::setName);
            Optional.ofNullable(projectEntity.getDescription()).ifPresent(existingProject::setDescription);
            Optional.ofNullable(projectEntity.getGithubLink()).ifPresent(existingProject::setGithubLink);
            Optional.ofNullable(projectEntity.getImageSource()).ifPresent(existingProject::setImageSource);
            return projectRepository.save(existingProject);
        }).orElseThrow(() -> new RuntimeException("Project not found"));
    }

    @Override
    public void delete(Long id) {
         projectRepository.deleteById(id);
    }
}
