package com.krzysztofsobol.cvwebsite.controllers;

import com.krzysztofsobol.cvwebsite.MapDataUtil;
import com.krzysztofsobol.cvwebsite.domain.dto.Tile;
import com.krzysztofsobol.cvwebsite.services.impl.MapService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedList;
import java.util.List;

@CrossOrigin(origins = "*", exposedHeaders = "Retry-After") // * added for the time of development
@RestController
public class MapController {
    MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping(path = "/api/mapData")
    public List<String> getDefaultMap(){
        LinkedList<Tile> tiles = MapDataUtil.getTiles();
        LinkedList<String> lines = mapService.generate(tiles, 70, 227);
        return mapService.encodeMapData(lines);
    }

    @GetMapping(path = "/api/modifiedMapData")
    public List<String> getModifiedMap(
        @RequestParam() int grassWeight,
        @RequestParam() int seaWeight,
        @RequestParam() int coastWeight,
        @RequestParam() int coastCornerWeight
    ) {
        if (grassWeight == 0 || seaWeight == 0 || coastWeight == 0 || coastCornerWeight == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "All weights must be non-zero");
        }

        LinkedList<Tile> tiles = MapDataUtil.getCustomizedTiles(grassWeight, seaWeight, coastWeight, coastCornerWeight);
        LinkedList<String> lines = mapService.generate(tiles, 70, 227);
        return mapService.encodeMapData(lines);
    }
}
