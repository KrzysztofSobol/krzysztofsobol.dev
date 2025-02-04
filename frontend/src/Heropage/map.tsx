import './map.css';
import {useState, useEffect} from 'react';
import Title from "../title.jsx";
import ScrollButton from "./buttonScroll.jsx";
import MapOptions from "./mapOptions.jsx";
import ButtonHeader from "@/Navbar/buttonHeader.jsx";
import {getCustomMap} from "@/services/mapService.ts";
import {mapParameters} from "@/types/mapType.ts";

function Map() {
    const [lines, setLines] = useState(() => {
        const storedData = localStorage.getItem('mapData');
        return storedData ? JSON.parse(storedData) : [];
    });

    const generateMap = async (parameters : mapParameters) => {
        try {
            const response = await getCustomMap(parameters);
            setLines(response);
            localStorage.setItem('mapData', JSON.stringify(response));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        generateMap({
            grassWeight: 90,
            seaWeight: 100,
            coastCornerWeight: 4,
            coastWeight: 1
        });
    }, []);

    function getLetterClass(letter : string) {
        switch (letter) {
            case 'X':
                return 'x';
            case '?':
                return 'w';
            case 'A':
                return 'a';
            case 'B':
                return 'b';
            case 'C':
                return 'c';
            case 'D':
                return 'd';
            case 'O':
                return 'o';
            case 'G':
                return 'g';
            default:
                return 'letter-default';
        }
    }

    return (
        <div className="theMap">
            <Title/>
            <canvas id="main" className="map-canvas">

            </canvas>
            <ScrollButton/>
            <MapOptions onGenerateMap={generateMap}/>
            <ButtonHeader />
        </div>
    );
}

export default Map;
