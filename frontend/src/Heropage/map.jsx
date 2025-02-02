import './map.css';
import React, {useState, useEffect} from 'react';
import Title from "../title.jsx";
import ScrollButton from "../buttonScroll.jsx";
import MapOptions from "./mapOptions.jsx";
import ButtonHeader from "@/Navbar/buttonHeader.jsx";
import {getCustomMap} from "@/services/mapService.ts";

function Map() {
    const [lines, setLines] = useState(() => {
        const storedData = localStorage.getItem('mapData');
        return storedData ? JSON.parse(storedData) : [];
    });

    useEffect(() => {
        getCustomMap({grassWeight: 90, seaWeight: 100, coastCornerWeight: 4, coastWeight: 1})
            .then(response => {
                setLines(response);
                localStorage.setItem('mapData', JSON.stringify(response));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function getLetterClass(letter) {
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
            <div id="main" className="linesContainer">
                {lines.map((line, lineIndex) => (
                    <p key={lineIndex} className="line">
                        {line.split('').map((char, charIndex) => (
                            <span key={charIndex} className={"unselectable " + getLetterClass(char)}>
                            {char}
                        </span>
                        ))}
                    </p>
                ))}
                <Title/>
                <ScrollButton target={"aboutMe"}/>
                <MapOptions/>
            </div>
            <ButtonHeader />
        </div>
    );
}

export default Map;
