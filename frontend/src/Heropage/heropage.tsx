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
    const [isVisible, setIsVisible] = useState(true);

    // Base values for 1080p resolution
    const BASE_FONT_SIZE = 16;
    const BASE_CHAR_WIDTH = 9.602;
    const BASE_LINE_HEIGHT = 14;
    const BASE_WIDTH = 1920;

    // Reference for current font settings
    const fontSettingsRef = useRef({
        fontSize: BASE_FONT_SIZE,
        charWidth: BASE_CHAR_WIDTH,
        lineHeight: BASE_LINE_HEIGHT
    });

    const [lines, setLines] = useState(() => {
        const storedData = localStorage.getItem('mapData');
        return storedData ? JSON.parse(storedData) : [];
    });

    useEffect(() => {
        if (!canvasRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            }
        );

        observer.observe(canvasRef.current);

        return () => {
            if (canvasRef.current) {
                observer.unobserve(canvasRef.current);
            }
        };
    }, [canvasRef]);

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

    const calculateFontSettings = (canvasWidth: number) => {
        // Linear scaling based on width ratio
        const scaleFactor = (canvasWidth / BASE_WIDTH) + 0.1;

        // Apply scaling
        fontSettingsRef.current = {
            fontSize: Math.max(BASE_FONT_SIZE * scaleFactor, BASE_FONT_SIZE),
            charWidth: Math.max(BASE_CHAR_WIDTH * scaleFactor, BASE_CHAR_WIDTH),
            lineHeight: Math.max(BASE_LINE_HEIGHT * scaleFactor, BASE_LINE_HEIGHT)
        };

        return fontSettingsRef.current;
    };

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

        const settings = calculateFontSettings(canvas.width);
        ctx.font = `${settings.fontSize}px Courier New`;

        const colorGroups: Record<string, {  c: string; x: number; y: number}[]> = {};

        lines.forEach((line: string, rowIndex: number) => {
            line.split("").forEach((char: string, colIndex: number) => {
                const color = getCharColor(char);
                if (!colorGroups[color]) colorGroups[color] = [];

                if(char !== "?"){
                    colorGroups[color].push({
                        c: char,
                        x: settings.charWidth * colIndex,
                        y: settings.lineHeight * rowIndex
                    });
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

        const settings = fontSettingsRef.current;
        ctx.font = `${settings.fontSize}px Courier New`;
        const time = timestamp * 0.001;

        lines.forEach((line: string, rowIndex: number) => {
            const waterLine = line.replace(/[^?]/g, " ");

            if (waterLine.includes("?")) {
                const wave = Math.sin(rowIndex * 0.25 + time * 3); // (wave length + speed)
                const brightness = Math.floor((wave + 1) * 40); // (waveValue * const)
                ctx.fillStyle = `rgb(${34 + brightness}, ${87 + brightness}, ${122 + brightness})`;

                ctx.fillText(waterLine, 0, settings.lineHeight * rowIndex);
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
        if (isVisible) {
            animationFrameRef.current = requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resizeCanvas);
        return () => {
            cancelAnimationFrame(animationFrameRef.current);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [lines, isVisible, drawOffScreenCanvas]);

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