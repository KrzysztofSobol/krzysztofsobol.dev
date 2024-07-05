package com.krzysztofsobol.cvwebsite.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TileInfo implements Comparable<TileInfo> {
    private int x, y, size;

    @Override
    public int compareTo(TileInfo other) {
        return Integer.compare(this.size, other.size);
    }
}