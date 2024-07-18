import React, { useRef, useEffect, useState } from "react";
import Map from "./map.jsx";
import Title from "./title.jsx";
import AboutMe from "./aboutMe.jsx";
import ScrollButton from "./buttonScroll.jsx";
import ButtonHeader from "./buttonHeader.jsx";

function App() {
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }
    }, []);

    return (
        <div className="map-container">
            <Map />
            <ScrollButton target={"aboutMe"} headerHeight={headerHeight} />
            <div ref={headerRef}>
                <ButtonHeader />
            </div>
            <Title />
            <AboutMe />
        </div>
    );
}

export default App;
