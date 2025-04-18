import {useEffect, useRef, useState} from "react"
import type { mapParameters } from "@/types/mapType.ts"
import "./mapOptions.css"

interface mapOptionProps {
    onGenerateMap: (parameters: mapParameters) => void;
    rateLimitError: { message: string, retryAfter: number } | null;
}

function MapOptions({ onGenerateMap, rateLimitError }: mapOptionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHighlighted, setIsHighlighted] = useState(true);
    const [rotationClass, setRotationClass] = useState("");
    const [warningInfo, setWarningInfo] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const warningTimerRef = useRef<number | null>(null);
    const [cooldownRemaining, setCooldownRemaining] = useState(0);
    const cooldownTimerRef = useRef<number | null>(null);

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

    // Handle rate limit error
    useEffect(() => {
        if (rateLimitError) {
            const seconds = Math.ceil(rateLimitError.retryAfter / 1000);
            setCooldownRemaining(seconds);

            if (cooldownTimerRef.current) {
                clearInterval(cooldownTimerRef.current);
            }

            cooldownTimerRef.current = window.setInterval(() => {
                setCooldownRemaining(prev => {
                    if (prev <= 1) {
                        if (cooldownTimerRef.current) {
                            clearInterval(cooldownTimerRef.current);
                            cooldownTimerRef.current = null;
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (cooldownTimerRef.current) {
                clearInterval(cooldownTimerRef.current);
            }
        };
    }, [rateLimitError]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const cappedValue = Math.min(Number.parseInt(value), 9999);
        setSliderValues((prev : any) => ({
            ...prev,
            [name]: cappedValue,
        }));
    };

    const showWarningMessage = () => {
        if (warningTimerRef.current !== null) {
            clearTimeout(warningTimerRef.current);
        }

        setWarningInfo("You cannot generate a new map when it's locked! Unlock the map first.");
        setShowWarning(true);

        warningTimerRef.current = window.setTimeout(() => {
            setShowWarning(false);
            warningTimerRef.current = null;
        }, 3000);
    };

    const handleGenerate = () => {
        if(isSaved === 1){
            showWarningMessage();
            return;
        }

        if (cooldownRemaining > 0) {
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
        setShowWarning(false);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsHighlighted(false);
        }, 5800);
        return () => clearTimeout(timer);
    }, []);

    const toggleOptions = () => {
        setIsOpen(!isOpen);
        setIsHighlighted(false);
        setRotationClass(isOpen ? "rotate-counterclockwise" : "rotate-clockwise");
    }

    return (
        <div>
            <button
                className={`settings-button ${rotationClass} ${isHighlighted ? 'focus' : ''}`} onClick={toggleOptions}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM10 18C10 16.9 10.9 16 12 16C13.1 16 14 16.9 14 18C14 19.1 13.1 20 12 20C10.9 20 10 19.1 10 18Z"
                        fill="#F4F8FF"
                    />
                </svg>
            </button>

            <div className={`map-options-container ${isOpen ? "visible" : ""}`} tabIndex={-1}>
                <div className="map-options-content">
                    <h2 className="options-title">Map Options</h2>
                    <div className="sliders">
                        <SliderWithTooltip
                            label="Grass Weight"
                            name="slider1"
                            value={sliderValues.slider1}
                            onChange={handleSliderChange}
                            min={1}
                            max={500}
                            isOpen={isOpen}
                            tooltipText="Controls the amount of grass terrain on the map. Higher values create more grassland areas."
                        />
                        <SliderWithTooltip
                            label="Sea Weight"
                            name="slider2"
                            value={sliderValues.slider2}
                            onChange={handleSliderChange}
                            min={1}
                            max={500}
                            isOpen={isOpen}
                            tooltipText="Determines the size and distribution of ocean areas. Higher values result in more water coverage."
                        />
                        <SliderWithTooltip
                            label="Coast Corner Weight"
                            name="slider3"
                            value={sliderValues.slider3}
                            onChange={handleSliderChange}
                            min={1}
                            max={100}
                            isOpen={isOpen}
                            tooltipText="Affects the sharpness of coastal corners. Higher values create more jagged coastlines."
                        />
                        <SliderWithTooltip
                            label="Coast Weight"
                            name="slider4"
                            value={sliderValues.slider4}
                            onChange={handleSliderChange}
                            min={1}
                            max={100}
                            isOpen={isOpen}
                            tooltipText="Higher values create longer coastlines. If the value is higher than the corner weight, the terrain will be more angular."
                        />
                    </div>
                    <div className="option-container">
                        <button
                            className={`button btn-options ${cooldownRemaining > 0 ? 'btn-cooldown' : ''}`}
                            onClick={handleGenerate}
                            tabIndex={isOpen ? 0 : -1}
                            title="generates a new map based on chosen parameters"
                            disabled={cooldownRemaining > 0}
                        >
                            generate
                        </button>
                        <button className="button btn-options btn-lock" onClick={handleSaveMap}
                                tabIndex={isOpen ? 0 : -1}
                                title={isSaved === 1 ? "Unlock to enable map generation" : "Lock the map, so it always stays the same"}>
                            {isSaved === 1 ? "unlock map" : "lock map"}
                        </button>
                    </div>
                    {cooldownRemaining > 0 ? (
                        <div className="warning-message">
                            You've reached the rate limit. You can try again in {cooldownRemaining} seconds.
                        </div>
                    ) : showWarning ? (
                        <div className="warning-message">
                            {warningInfo}
                        </div>
                    ) : null}

                </div>
            </div>
        </div>
    )
}

interface SliderTooltipProps {
    label: string;
    name: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min: number;
    max: number;
    isOpen: boolean;
    tooltipText: string;
}

function SliderWithTooltip({label, name, value, onChange, min, max, isOpen, tooltipText}: SliderTooltipProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="slider-container">
            <div className="slider-label-container">
                <label htmlFor={name} className="slider-label">
                    {label}
                </label>
                <div
                    className="info-icon"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    ?
                    {showTooltip && (
                        <div className="tooltip-box">
                            {tooltipText}
                        </div>
                    )}
                </div>
            </div>
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
                    tabIndex={isOpen ? 0 : -1}
                />
                <input
                    type="number"
                    name={name}
                    min={min}
                    max={max}
                    value={value}
                    onChange={onChange}
                    className="slider-number"
                    tabIndex={isOpen ? 0 : -1}
                />
            </div>
        </div>
    )
}

export default MapOptions