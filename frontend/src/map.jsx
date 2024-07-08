import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Map() {
    const rows = 26;
    const columns = 100;

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/mapdata')
            .then(response => {
                setPosts(response.data);
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
                return 'letter-w'
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
                return '';
        }
    }

    // Create a 2D array to represent the table data
    const tableData = Array.from({ length: rows }, () => Array(columns).fill('.'));

    // Populate the tableData with letters from the API response
    posts.forEach(post => {
        if (post.x < rows && post.y < columns) {
            tableData[post.x][post.y] = post.letter;
        }
    });

    return (
        <div className="tableContainer">
            <table className="table">
                <tbody>
                {
                    tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {
                                row.map((cell, colIndex) => (
                                    <th key={colIndex} className={getLetterClass(cell)}>
                                        {cell}
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default Map;
