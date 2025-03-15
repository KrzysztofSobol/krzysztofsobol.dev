package com.krzysztofsobol.cvwebsite.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectDto {
    private Long id;
    private String name;
    private String description;
    private String githubLink;
}
