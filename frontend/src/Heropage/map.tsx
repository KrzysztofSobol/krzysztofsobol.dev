import './map.css';
import {useState, useEffect, useRef} from 'react';
import Title from "../title.jsx";
import ScrollButton from "./buttonScroll.jsx";
import MapOptions from "./mapOptions.jsx";
import ButtonHeader from "@/Navbar/buttonHeader.jsx";
import {getCustomMap} from "@/services/mapService.ts";
import {mapParameters} from "@/types/mapType.ts";

function Map() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
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

    function getCharColor(letter : string) {
        switch (letter) {
            case 'X':
                return '#4dbf9d';
            case '?':
                return '#22577a';
            case 'A':
                return '#38a3a5';
            case 'B':
                return '#38a3a5';
            case 'C':
                return '#38a3a5';
            case 'D':
                return '#38a3a5';
            case 'O':
                return '#38a3a5';
            case 'G':
                return '#247a91';
            default:
                return '#FFFFFF';
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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            const container = canvas.parentElement;
            if (container) {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;

                // redraw
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.font = "16px Courier New"

                    lines.forEach((line : string, index : number) => {
                        line.split('').map((char : string, charIndex : number) => {

                            ctx.fillStyle = getCharColor(char);
                            ctx.fillText(char, 10 * (charIndex), 14 * (index))
                        })
                    })
                }
            }
        };

        resizeCanvas();

        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [lines]);

    return (
        <div className="theMap">
            <Title/>
            <canvas
                ref={canvasRef}
                id="main"
                className="map-canvas"
            >
            </canvas>
            <ScrollButton/>
            <MapOptions onGenerateMap={generateMap}/>
            <ButtonHeader/>
        </div>
    );
}

export default Map;
