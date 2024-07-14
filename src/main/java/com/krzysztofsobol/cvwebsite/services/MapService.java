package com.krzysztofsobol.cvwebsite.services;

import com.krzysztofsobol.cvwebsite.domain.dto.Tile;
import com.krzysztofsobol.cvwebsite.domain.dto.TileInfo;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.PriorityQueue;
import java.util.Random;

@Service
public class MapService {
    private final int xMax;
    private final int yMax;
    private LinkedList<Tile>[][] map;
    private LinkedList<String> lines;
    private PriorityQueue<TileInfo> tileQueue;

    public MapService() {
        this.xMax = 47;
        this.yMax = 211;
    }

    @SuppressWarnings("unchecked")
    public void init(LinkedList<Tile> tiles) {
        tiles = deepCopyTiles(tiles);
        map = new LinkedList[xMax][yMax];
        lines = new LinkedList<>();
        tileQueue = new PriorityQueue<>();

        for (int i = 0; i < xMax; i++) {
            for (int j = 0; j < yMax; j++) {
                map[i][j] = deepCopyTiles(tiles);
            }
        }
    }

    private LinkedList<Tile> deepCopyTiles(LinkedList<Tile> source) {
        LinkedList<Tile> copy = new LinkedList<>();
        for (Tile tile : source) {
            copy.add(tile.clone());
        }
        return copy;
    }


    @SuppressWarnings("DataFlowIssue")
    public void Generate(){
        Random rand = new Random();
        int x = rand.nextInt(xMax);
        int y = rand.nextInt(yMax);

        tileQueue.add(new TileInfo(x, y, 1));

        while(!tileQueue.isEmpty()){
            TileInfo nextTile = tileQueue.peek();
            x = nextTile.getX();
            y = nextTile.getY();

            Tile tile = RandomTile(map[x][y]);
            map[x][y].clear();
            map[x][y].add(tile);
            tile.setCollapsed(true);

            tileQueue.remove();
            UpdateNeighbours(x, y);
        }
    }

    public LinkedList<String> GetLines(){
        for(int i=0; i<xMax; i++){
            StringBuilder line = new StringBuilder();
            for(int j=0; j<yMax; j++){
                line.append(map[i][j].getFirst().getDisplay());
            }
            lines.add(line.toString());
        }
        return lines;
    }

    private void UpdateNeighbours(int x, int y) {
        Tile tile = map[x][y].getFirst();

        // Check left neighbor (x - 1)
        if (x > 0 && map[x - 1][y].size() > 1) {
            filterTiles(map[x - 1][y], tile.getNorth(), 'N');
            int mapSize = map[x - 1][y].size();
            addToQueue(x - 1, y, mapSize);
        }

        // Check upper neighbor (y + 1)
        if (y < yMax - 1 && map[x][y + 1].size() > 1) {
            filterTiles(map[x][y + 1], tile.getEast(), 'E');
            int mapSize = map[x][y + 1].size();
            addToQueue(x, y + 1, mapSize);
        }

        // Check right neighbor (x + 1)
        if (x < xMax - 1 && map[x + 1][y].size() > 1) {
            filterTiles(map[x + 1][y], tile.getSouth(), 'S');
            int mapSize = map[x + 1][y].size();
            addToQueue(x + 1, y, mapSize);
        }

        // Check lower neighbor (y - 1)
        if (y > 0 && map[x][y - 1].size() > 1) {
            filterTiles(map[x][y - 1], tile.getWest(), 'W');
            int mapSize = map[x][y - 1].size();
            addToQueue(x, y - 1, mapSize);
        }
    }

    private void addToQueue(int x, int y, int mapSize){
        if(!map[x][y].getFirst().isCollapsed()){
            tileQueue.add(new TileInfo(x, y, mapSize));
        } else {
            map[x][y].getFirst().setCollapsed(true);
        }
    }

    private void filterTiles(LinkedList<Tile> neighbors, int direction, char side) {
        Iterator<Tile> iterator = neighbors.iterator();
        while (iterator.hasNext()) {
            Tile t = iterator.next();
            switch(side){
                case 'N':
                    if (t.getSouth() != direction) iterator.remove();
                    break;
                case 'S':
                    if(t.getNorth() != direction) iterator.remove();
                    break;
                case 'E':
                    if(t.getWest() != direction) iterator.remove();
                    break;
                case 'W':
                    if(t.getEast() != direction) iterator.remove();
                    break;
            }
        }
    }

    // Chooses a random tile based on its weight
    private Tile RandomTile(LinkedList<Tile> tiles){
        int totalWeight = tiles.stream().mapToInt(Tile::getWeight).sum();
        Random rand = new Random();
        int rValue = rand.nextInt(totalWeight);

        for(Tile tile : tiles){
            rValue -= tile.getWeight();
            if(rValue <= 0){
                return tile;
            }
        }
        return null;
    }

    @Override
    public String toString(){
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < xMax; i++) {
            for (int j = 0; j < yMax; j++) {
                char display = map[i][j].getFirst().getDisplay();
                result.append(display).append(" ");
            }
            result.append("\n");
        }
        return result.toString();
    }
}
