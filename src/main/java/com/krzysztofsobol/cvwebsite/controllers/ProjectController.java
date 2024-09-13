package com.krzysztofsobol.cvwebsite.controllers;

import com.krzysztofsobol.cvwebsite.domain.dto.ProjectDto;
import com.krzysztofsobol.cvwebsite.domain.dto.entity.ProjectEntity;
import com.krzysztofsobol.cvwebsite.mappers.impl.ProjectMapper;
import com.krzysztofsobol.cvwebsite.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ProjectController {
    private final ProjectMapper projectMapper;
    ProjectService projectService;

    public ProjectController(ProjectService projectService, ProjectMapper projectMapper){
        this.projectService = projectService;
        this.projectMapper = projectMapper;
    }

    @PostMapping(path = "/api/project")
    public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectDto project){
        ProjectEntity projectEntity = projectMapper.mapFromDto(project);
        ProjectEntity savedProjectEntity = projectService.save(projectEntity);
        return new ResponseEntity<>(projectMapper.mapToDto(savedProjectEntity), HttpStatus.CREATED);
    }

    @GetMapping(path = "/api/projects")
    public List<ProjectDto> listProjects(){
        List<ProjectEntity> projects = projectService.findAll();
        return projects.stream().map(projectMapper::mapToDto).collect(Collectors.toList());
    }
}
