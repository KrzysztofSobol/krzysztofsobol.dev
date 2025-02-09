import "./sliderNumberInput.css"

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
        <div className={"slider-input"}>
            <input className={"slider-range"}
                tabIndex={tabIndex}
                type="range"
                name={name}
                min={min}
                max={max}
                value={value}
                onChange={onChange}
            />
            <input className={"slider-number"}
                tabIndex={tabIndex}
                type="number"
                name={name}
                min={min}
                max={max}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}