import {useState} from "react"
import type { mapParameters } from "@/types/mapType.ts"
import "./mapOptions.css"

interface mapOptionProps {
    onGenerateMap: (parameters: mapParameters) => void;
}

function MapOptions({ onGenerateMap }: mapOptionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [rotationClass, setRotationClass] = useState("");

    const [isSaved, setIsSaved] = useState(() => {
        const isSavedValue = localStorage.getItem('isSaved');
        return isSavedValue && JSON.parse(isSavedValue) === 1 ? 1 : 0;
    });

    const [sliderValues, setSliderValues] = useState(() => {
        const savedValues = localStorage.getItem('sliderValues');
        return savedValues && isSaved === 1 ? JSON.parse(savedValues) : {
            slider1: 220,
            slider2: 200,
            slider3: 6,
            slider4: 3,
        };
    });

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSliderValues((prev : any) => ({
            ...prev,
            [name]: Number.parseInt(value),
        }));
    };

    const handleGenerate = () => {
        if(isSaved === 1){
            return;
        }

        const mapParameters = {
            grassWeight: sliderValues.slider1,
            seaWeight: sliderValues.slider2,
            coastCornerWeight: sliderValues.slider3,
            coastWeight: sliderValues.slider4,
        };
        localStorage.setItem('sliderValues', JSON.stringify(sliderValues));
        onGenerateMap(mapParameters);
    }

    const handleSaveMap = () => {
        setIsSaved(prev => {
            const newValue = Number(!prev);
            localStorage.setItem('isSaved', `${newValue}`);
            if(newValue == 0){
                localStorage.removeItem('sliderValues');
            }
            return newValue;
        });
        localStorage.setItem('isSaved', '1');
    }

    const toggleOptions = () => {
        setIsOpen(!isOpen);
        setRotationClass(isOpen ? "rotate-counterclockwise" : "rotate-clockwise");
    }

    return (
        <div className="map-options-wrapper">
            <button className={`settings-button ${rotationClass}`} onClick={toggleOptions}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM10 18C10 16.9 10.9 16 12 16C13.1 16 14 16.9 14 18C14 19.1 13.1 20 12 20C10.9 20 10 19.1 10 18Z"
                        fill="#F4F8FF"
                    />
                </svg>
            </button>

            <div className={`map-options-container ${isOpen ? "visible" : ""}`}>
                <div className="map-options-content">
                    <h2 className="options-title">Map Options</h2>
                    <div className="sliders">
                        <SliderWithNumber
                            label="Grass Weight"
                            name="slider1"
                            value={sliderValues.slider1}
                            onChange={handleSliderChange}
                            min={1}
                            max={500}
                        />
                        <SliderWithNumber
                            label="Sea Weight"
                            name="slider2"
                            value={sliderValues.slider2}
                            onChange={handleSliderChange}
                            min={1}
                            max={500}
                        />
                        <SliderWithNumber
                            label="Coast Corner Weight"
                            name="slider3"
                            value={sliderValues.slider3}
                            onChange={handleSliderChange}
                            min={1}
                            max={100}
                        />
                        <SliderWithNumber
                            label="Coast Weight"
                            name="slider4"
                            value={sliderValues.slider4}
                            onChange={handleSliderChange}
                            min={1}
                            max={100}
                        />
                    </div>
                    <div className="option-container">
                        <button className="button btn-options" onClick={handleGenerate}>
                            generate
                        </button>
                        <button className="button btn-options btn-lock" onClick={handleSaveMap}>
                            {isSaved === 1 ? "unlock map" : "lock map"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface SliderProps {
    label: string;
    name: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min: number;
    max: number;
}

function SliderWithNumber({ label, name, value, onChange, min, max }: SliderProps) {
    return (
        <div className="slider-container">
            <label htmlFor={name} className="slider-label">
                {label}
            </label>
            <div className="slider-input-group">
                <input
                    type="range"
                    id={name}
                    name={name}
                    min={min}
                    max={max}
                    value={value}
                    onChange={onChange}
                    className="slider-range"
                />
                <input
                    type="number"
                    name={name}
                    min={min}
                    max={max}
                    value={value}
                    onChange={onChange}
                    className="slider-number"
                />
            </div>
        </div>
    )
}

export default MapOptions