package com.krzysztofsobol.cvwebsite.domain.dto.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "project")

public class ProjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "project_id_seq")
    private Long id;
    private String name;
    private String description;
    private String githubLink;
}
