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
    const offScreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationFrameRef = useRef<number>(0);
    const timeRef = useRef<number>(0);

    const [lines, setLines] = useState(() => {
        const storedData = localStorage.getItem('mapData');
        return storedData ? JSON.parse(storedData) : [];
    });

    const generateMap = async (parameters: mapParameters) => {
        try {
            const response = await getCustomMap(parameters);
            setLines(response);
            localStorage.setItem('mapData', JSON.stringify(response));
        } catch (error) {
            console.error(error);
        }
    }

    function getCharColor(letter: string) {
        switch (letter) {
            case 'X': return '#4dbf9d';
            case 'A':
            case 'B':
            case 'C':
            case 'D':
            case 'O': return '#38a3a5';
            case 'G': return '#247a91';
            default: return '#FFFFFF';
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas){
            return;
        }

        const offScreenCanvas = document.createElement("canvas");
        offScreenCanvas.width = canvas.width;
        offScreenCanvas.height = canvas.height;
        offScreenCanvasRef.current = offScreenCanvas;

        const ctx = offScreenCanvas.getContext("2d");
        if(!ctx){
            return;
        }

        ctx.font = "16px Courier New";

        lines.forEach((line: string, rowIndex: number) => {
            line.split("").forEach((char: string, colIndex: number) => {
                ctx.fillStyle = getCharColor(char);
                if(char === "?"){
                    ctx.fillText(" ", 10 * colIndex, 14 * rowIndex);
                } else {
                    ctx.fillText(char, 10 * colIndex, 14 * rowIndex);
                }
            });
        });
    }, [lines]);

    // ========================= MID slow code below ============================== //

    const animate = (timestamp: number) => {
        const canvas = canvasRef.current;
        const offscreenCanvas = offScreenCanvasRef.current;
        if (!canvas || !offscreenCanvas){
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(offscreenCanvas, 0, 0); // copy the pre-rendered canvas

        ctx.font = "16px Courier New";
        const time = timestamp * 0.001;

        lines.forEach((line : string, rowIndex: number) => {
            line.split("").forEach((char : string, colIndex : number) => {
                if(char === "?"){
                    const wave = Math.sin(rowIndex * 0.6 + time * 2);
                    const brightness = Math.floor((wave + 1) * 30);
                    ctx.fillStyle = `rgb(${34 + brightness}, ${87 + brightness}, ${122 + brightness})`;
                    ctx.fillText(char, 10 * colIndex, 14 * rowIndex);
                }
            });
        });
    };

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
            if (!container) return;

            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };

        resizeCanvas();

        timeRef.current = 0;
        animationFrameRef.current = requestAnimationFrame(animate);

        window.addEventListener('resize', resizeCanvas);

        return () => {
            cancelAnimationFrame(animationFrameRef.current);
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
            />
            <ScrollButton/>
            <MapOptions onGenerateMap={generateMap}/>
            <ButtonHeader/>
        </div>
    );
}

export default Map;