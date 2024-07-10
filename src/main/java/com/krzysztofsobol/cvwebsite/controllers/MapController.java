package com.krzysztofsobol.cvwebsite.controllers;

import com.krzysztofsobol.cvwebsite.domain.dto.Step;
import com.krzysztofsobol.cvwebsite.domain.dto.Tile;
import com.krzysztofsobol.cvwebsite.services.MapService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

@RestController
public class MapController {
    MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @CrossOrigin(origins = "http://localhost:5173") // for testing the frontend
    @GetMapping(path = "/api/mapdata")
    public List<String> listMapSteps(){
        LinkedList<Tile> tiles = new LinkedList<>();

        Tile grass = new Tile('X', 300, 3, 3, 3, 3);
        Tile sea = new Tile('?', 200, 1, 1, 1, 1);

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

        mapService.init(tiles);
        mapService.Generate();
        return mapService.GetLines();
    }
}
