package com.krzysztofsobol.cvwebsite.controllers;

import com.krzysztofsobol.cvwebsite.domain.dto.ProjectDto;
import com.krzysztofsobol.cvwebsite.domain.dto.entity.ProjectEntity;
import com.krzysztofsobol.cvwebsite.mappers.impl.ProjectMapper;
import com.krzysztofsobol.cvwebsite.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*") // added for the time of development
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

    @PatchMapping(path = "/api/project/{id}")
    public ResponseEntity<ProjectDto> updateProject(@PathVariable("id") Long id, @RequestBody ProjectDto project){
        if(!projectService.exists(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        project.setId(id);
        ProjectEntity projectEntity = projectMapper.mapFromDto(project);
        ProjectEntity savedProjectEntity = projectService.update(id, projectEntity);
        return new ResponseEntity<>(projectMapper.mapToDto(savedProjectEntity), HttpStatus.OK);
    }

    @GetMapping(path = "/api/projects")
    public List<ProjectDto> listProjects(){
        List<ProjectEntity> projects = projectService.findAll();
        return projects.stream().map(projectMapper::mapToDto).collect(Collectors.toList());
    }
}
