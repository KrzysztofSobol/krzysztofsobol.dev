import React from 'react';

function MapLine(props) {
    const mapProp = props.map;

    function getLetterClass(letter) {
        switch (letter) {
            case 'A':
                return 'letter-a';
            case 'B':
                return 'letter-b';
            case 'C':
                return 'letter-c';
            case 'X':
                return 'letter-x';
            default:
                return '';
        }
    }

    return (
        <div className="tableContainer">
            <table className="table">
                <tbody>
                {mapProp.map((row, rowIndex) => (
                    <tr key={rowIndex} align="center">
                        {row.map((cell, cellIndex) => (
                            <th className={`${getLetterClass(cell)}`} key={cellIndex}>
                                {cell}
                            </th>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MapLine;
