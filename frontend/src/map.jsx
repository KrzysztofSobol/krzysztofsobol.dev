import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Map() {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/mapdata')
            .then(response => {
                setLines(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Function to determine the class based on letter
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
        <div className="linesContainer">
            {lines.map((line, lineIndex) => (
                <p key={lineIndex} className="line">
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
