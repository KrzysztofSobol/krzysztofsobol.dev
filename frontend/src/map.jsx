import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Map() {
    const [lines, setLines] = useState(() => {
        const storedData = localStorage.getItem('mapData');
        return storedData ? JSON.parse(storedData) : [];
    });

    useEffect(() => {
        axios.get('http://localhost:8080/api/mapdata')
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
                return 'letter-x';
            case '?':
                return 'letter-w';
            case 'A':
                return 'letter-a';
            case 'B':
                return 'letter-b';
            case 'C':
                return 'letter-c';
            case 'D':
                return 'letter-d';
            case 'O':
                return 'letter-o';
            case 'G':
                return 'letter-g';
            default:
                return 'letter-default';
        }
    }

    return (
        <div id={"main"} className="linesContainer">
            {lines.map((line, lineIndex) => (
                <p key={lineIndex} className="line" >
                    {line.split('').map((char, charIndex) => (
                        <span key={charIndex} className={getLetterClass(char)}>
                            {char}
                        </span>
                    ))}
                </p>
            ))}
        </div>
    );
}

export default Map;
