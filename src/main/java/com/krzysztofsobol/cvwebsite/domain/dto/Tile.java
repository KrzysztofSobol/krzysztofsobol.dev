package com.krzysztofsobol.cvwebsite.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Tile implements Cloneable{
    private char display; // a character to display on the map
    private int weight; // a percentage chance of being chosen

    private int north;
    private int east;
    private int south;
    private int west;

    private boolean collapsed;

    public Tile(char display, int weight, int north, int east, int south, int west) {
        this.setDisplay(display);
        this.setWeight(weight);
        this.setNorth(north);
        this.setEast(east);
        this.setSouth(south);
        this.setWest(west);
        this.collapsed = false;
    }

    @Override
    public Tile clone() {
        try {
            return (Tile) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}
