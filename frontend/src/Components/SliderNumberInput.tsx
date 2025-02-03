interface sliderProps {
    tabIndex: number;
    name: string;
    value: number;
    onChange: (e: any) => void;
    min: number;
    max: number;
}

export default function SliderWithNumber({ tabIndex, name, value, onChange, min = 0, max = 100 } : sliderProps) {
    return (
        <div className="flex items-center space-x-4 p-4">
            <input
                tabIndex={tabIndex}
                type="range"
                name={name}
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                className="slider"
            />
            <input
                tabIndex={tabIndex}
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