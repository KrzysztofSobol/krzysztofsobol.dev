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

@CrossOrigin(origins = "*") // added for the time of development
@RestController
public class MapController {
    MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping(path = "/api/mapdata")
    public List<String> listMapSteps(){
        LinkedList<Tile> tiles = MapDataUtil.getMapData();
        mapService.init(tiles);
        mapService.Generate();
        return mapService.GetLines();
    }
}
