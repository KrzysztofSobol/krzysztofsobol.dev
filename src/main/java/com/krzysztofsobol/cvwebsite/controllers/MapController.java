package com.krzysztofsobol.cvwebsite.controllers;

import com.krzysztofsobol.cvwebsite.MapDataUtil;
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

    @CrossOrigin(origins = "http://localhost:5174")
    @GetMapping(path = "/api/mapdata")
    public List<String> listMapSteps(){
        LinkedList<Tile> tiles = MapDataUtil.getMapData();
        mapService.init(tiles);
        mapService.Generate();
        System.out.println("called!");
        return mapService.GetLines();
    }
}
