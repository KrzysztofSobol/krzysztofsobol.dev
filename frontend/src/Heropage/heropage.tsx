import './heropage.css';
import {useState, useEffect, useRef, useCallback} from 'react';
import Title from "./title.tsx";
import ScrollButton from "./buttonScroll.jsx";
import MapOptions from "./mapOptions.jsx";
import ButtonHeader from "@/Navbar/buttonHeader.jsx";
import {getCustomMap} from "@/services/mapService.ts";
import {mapParameters} from "@/types/mapType.ts";

function Heropage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offScreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationFrameRef = useRef<number>(0);

    const [lines, setLines] = useState(() => {
        const storedData = localStorage.getItem('mapData');
        return storedData ? JSON.parse(storedData) : [];
    });

    const generateMap = async (parameters: mapParameters) => {
        try {
            if(localStorage.getItem('isSaved') === '1'){
                return;
            }

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

    // land
    const drawOffScreenCanvas = useCallback(() => {
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

        const colorGroups: Record<string, {  c: string; x: number; y: number}[]> = {};

        lines.forEach((line: string, rowIndex: number) => {
            line.split("").forEach((char: string, colIndex: number) => {
                const color = getCharColor(char);
                if (!colorGroups[color]) colorGroups[color] = [];

                if(char !== "?"){
                    colorGroups[color].push({ c: char, x: 9.602 * colIndex, y: 14 * rowIndex});
                }
            });
        });

        Object.keys(colorGroups).forEach((color) => {
            ctx.fillStyle = color;
            colorGroups[color].forEach(({c,x,y}) => {
                ctx.fillText(c, x, y);
            })
        })
    }, [lines]);

    // water
    const animate = (timestamp: number) => {
        const canvas = canvasRef.current;
        const offscreenCanvas = offScreenCanvasRef.current;
        if (!canvas || !offscreenCanvas) {
            return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(offscreenCanvas, 0, 0); // copy the pre-rendered canvas

        ctx.font = "16px Courier New";
        const time = timestamp * 0.001;

        lines.forEach((line: string, rowIndex: number) => {
            const waterLine = line.replace(/[^?]/g, " ");

            if (waterLine.includes("?")) {
                const wave = Math.sin(rowIndex * 0.25 + time * 3); // (wave length + speed)
                const brightness = Math.floor((wave + 1) * 40); // (waveValue * const)
                ctx.fillStyle = `rgb(${34 + brightness}, ${87 + brightness}, ${122 + brightness})`;

                ctx.fillText(waterLine, 0, 14 * rowIndex);
            }
        });

        animationFrameRef.current = requestAnimationFrame(animate);
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

            drawOffScreenCanvas();
        };

        resizeCanvas();
        animationFrameRef.current = requestAnimationFrame(animate);

        window.addEventListener('resize', resizeCanvas);
        return () => {
            cancelAnimationFrame(animationFrameRef.current);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [lines]);

    return (
        <div className="theMap">
            <div className={"map-canvas"}>
                <canvas
                    ref={canvasRef}
                    id="main"
                />
                <MapOptions onGenerateMap={generateMap}/>
                <Title/>
            </div>
            <ScrollButton/>
            <ButtonHeader/>
        </div>
    );
}

export default Heropage;