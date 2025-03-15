package com.krzysztofsobol.cvwebsite;

import com.krzysztofsobol.cvwebsite.domain.dto.entity.ProjectEntity;

public class TestDataUtil {
    public static ProjectEntity createProjectEntity1() {
        return ProjectEntity.builder()
                .id(1L)
                .name("projectName")
                .description("projectDescription")
                .githubLink("github.com/krzysztofsobol/project")
                .build();
    }

    public static ProjectEntity createProjectEntity2() {
        return ProjectEntity.builder()
                .id(2L)
                .name("projectName2")
                .description("projectDescription2")
                .githubLink("github.com/krzysztofsobol/project2")
                .build();
    }

    public static ProjectEntity createProjectEntity3() {
        return ProjectEntity.builder()
                .id(3L)
                .name("projectName3")
                .description("projectDescription3")
                .githubLink("github.com/krzysztofsobol/project3")
                .build();
    }
}
