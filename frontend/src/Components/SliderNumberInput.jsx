import { useState } from "react";

export default function SliderWithNumber({ name, value, onChange, min = 0, max = 100 }) {
    return (
        <div className="flex items-center space-x-4 p-4">
            <input
                type="range"
                name={name}
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                className="slider"
            />
            <input
                type="number"
                name={name}
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                className="w-16 p-1 border rounded"
            />
        </div>
    );
}