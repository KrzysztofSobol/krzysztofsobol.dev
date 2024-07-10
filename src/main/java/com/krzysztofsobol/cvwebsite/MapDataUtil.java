package com.krzysztofsobol.cvwebsite;

import com.krzysztofsobol.cvwebsite.domain.dto.Tile;

import java.util.LinkedList;

public class MapDataUtil {
    public static LinkedList<Tile> getMapData(){
        LinkedList<Tile> tiles = new LinkedList<>();

        Tile grass = new Tile('X', 200, 3, 3, 3, 3);
        Tile sea = new Tile('?', 100, 1, 1, 1, 1);

        Tile coast = new Tile('A', 10, 3, 5, 1, 5);
        Tile coast1 = new Tile('B', 10, 4, 3, 4, 1);
        Tile coast2 = new Tile('C', 10, 1, 4, 3, 4);
        Tile coast3 = new Tile('D', 10, 2, 1, 2, 3);

        Tile coast_corner = new Tile('O', 10,3, 5, 2, 3);
        Tile coast_corner1 = new Tile('O', 10,3, 3, 4, 5);
        Tile coast_corner2 = new Tile('O', 10, 4, 3, 3, 4);
        Tile coast_corner3 = new Tile('O', 10, 2, 4, 3, 3);

        Tile outer_corner = new Tile('G', 10, 1, 1, 2, 4);
        Tile outer_corner1 = new Tile('G', 10, 2, 1, 1, 5);
        Tile outer_corner2 = new Tile('G', 10, 1, 4, 4, 1);
        Tile outer_corner3 = new Tile('G', 10, 4, 5, 1, 1);

        tiles.add(grass);
        tiles.add(sea);
        tiles.add(coast);
        tiles.add(coast1);
        tiles.add(coast2);
        tiles.add(coast3);
        tiles.add(coast_corner);
        tiles.add(coast_corner1);
        tiles.add(coast_corner2);
        tiles.add(coast_corner3);
        tiles.add(outer_corner);
        tiles.add(outer_corner1);
        tiles.add(outer_corner2);
        tiles.add(outer_corner3);

        return tiles;
    }
}
