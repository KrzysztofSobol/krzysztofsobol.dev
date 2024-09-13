package com.krzysztofsobol.cvwebsite.mappers.impl;

import com.krzysztofsobol.cvwebsite.domain.dto.ProjectDto;
import com.krzysztofsobol.cvwebsite.domain.dto.entity.ProjectEntity;
import com.krzysztofsobol.cvwebsite.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper implements Mapper<ProjectEntity, ProjectDto> {
    private final ModelMapper modelMapper;

    public ProjectMapper(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }

    @Override
    public ProjectDto mapToDto(ProjectEntity projectEntity) {
        return modelMapper.map(projectEntity, ProjectDto.class);
    }

    @Override
    public ProjectEntity mapFromDto(ProjectDto projectDto) {
        return modelMapper.map(projectDto, ProjectEntity.class);
    }
}
