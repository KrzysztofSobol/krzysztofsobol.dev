package com.krzysztofsobol.cvwebsite.repositories;

import com.krzysztofsobol.cvwebsite.TestDataUtil;
import com.krzysztofsobol.cvwebsite.domain.dto.entity.ProjectEntity;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)

public class ProjectEntityTests {
    private final ProjectRepository projectRepositoryTest;

    @Autowired
    public ProjectEntityTests(ProjectRepository project) {
        this.projectRepositoryTest = project;
    }

    @Test
    public void testThatProjectCanBeCratedAndRecalled(){
        ProjectEntity projectEntity = TestDataUtil.createProjectEntity1();
        projectRepositoryTest.save(projectEntity);
        Optional<ProjectEntity> result = projectRepositoryTest.findById(projectEntity.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(projectEntity);
    }

    @Test
    public void testThatMultipleProjectsCanBeCratedAndRecalled(){
        ProjectEntity projectEntity1 = TestDataUtil.createProjectEntity1();
        ProjectEntity projectEntity2 = TestDataUtil.createProjectEntity2();
        ProjectEntity projectEntity3 = TestDataUtil.createProjectEntity3();

        projectRepositoryTest.save(projectEntity1);
        projectRepositoryTest.save(projectEntity2);
        projectRepositoryTest.save(projectEntity3);

        Iterable<ProjectEntity> result = projectRepositoryTest.findAll();
        assertThat(result).isNotEmpty();
        assertThat(result).hasSize(3);
        assertThat(result).containsExactly(projectEntity1, projectEntity2, projectEntity3);
    }
}
