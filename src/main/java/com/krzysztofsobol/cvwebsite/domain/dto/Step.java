package com.krzysztofsobol.cvwebsite.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Step {
    private int x;
    private int y;
    private char letter;
}
