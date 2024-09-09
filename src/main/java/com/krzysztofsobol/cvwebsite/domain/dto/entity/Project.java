package com.krzysztofsobol.cvwebsite.domain.dto.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "project")

public class Project {
    @Id
    private Long id;
    private String name;
    private String description;
    private String githubLink;
    private String imageSource;
}
