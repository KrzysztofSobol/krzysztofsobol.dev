import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Title from "../title.jsx";
import ScrollButton from "../buttonScroll.jsx";
import './map.css';
import MapOptions from "./mapOptions.jsx";
import ButtonHeader from "@/Navbar/buttonHeader.jsx";

function Map() {
    const [lines, setLines] = useState(() => {
        const storedData = localStorage.getItem('mapData');
        return storedData ? JSON.parse(storedData) : [];
    });

    useEffect(() => {
        axios.get('http://localhost:8080/api/modifiedMapData?grassWeight=90&seaWeight=100&coastCornerWeight=4&coastWeight=1')
            .then(response => {
                setLines(response.data);
                // Store the new data in local storage so the map doesn't disappear after the refresh
                localStorage.setItem('mapData', JSON.stringify(response.data));
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
                <MapOptions/>
                <Title/>
                <ScrollButton target={"aboutMe"}/>
            </div>
            <ButtonHeader />
        </div>
    );
}

export default Map;
