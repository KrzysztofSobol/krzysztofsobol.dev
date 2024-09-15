package com.krzysztofsobol.cvwebsite.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.krzysztofsobol.cvwebsite.TestDataUtil;
import com.krzysztofsobol.cvwebsite.domain.dto.entity.ProjectEntity;
import com.krzysztofsobol.cvwebsite.services.ProjectService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@AutoConfigureMockMvc
public class ProjectControllerTest {
    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private ProjectService projectService;

    @Autowired
    public ProjectControllerTest(MockMvc mockMvc, ObjectMapper objectMapper, ProjectService projectService) {
        this.mockMvc = mockMvc;
        this.objectMapper = objectMapper;
        this.projectService = projectService;
    }

    @Test
    public void testThatCreateProjectSuccessfullyReturnsHttp201Crated() throws Exception {
        ProjectEntity project1 = TestDataUtil.createProjectEntity1();
        String projectJson = objectMapper.writeValueAsString(project1);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/project")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectJson)
                ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        );
    }

    @Test
    public void testThatCreateProjectReturnsSavedProject() throws Exception {
        ProjectEntity project1 = TestDataUtil.createProjectEntity1();
        String projectJson = objectMapper.writeValueAsString(project1);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/project")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectJson)
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.id").isNumber()
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.name").value("projectName")
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.description").value("projectDescription")
        );
    }

    @Test
    public void testThatListProjectsReturnsProjects() throws Exception {
        ProjectEntity project1 = TestDataUtil.createProjectEntity1();
        projectService.save(project1);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/projects")
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].id").isNumber()
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].name").value("projectName")
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].description").value("projectDescription")
        );
    }
}