import React, { useRef, useEffect, useState } from "react";
import Map from "./Heropage/map.tsx";
import Footer from "./footer.jsx";
import AboutMe from "./AboutMe/aboutMe.tsx";
import Contact from "@/Contact/contact.tsx";

function App() {
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }
    }, []);

    const MapComponent = React.memo(Map)

    return (
        <>
            <MapComponent />
            <AboutMe />
            <Contact />
            <Footer />
        </>
    );
}

export default App;
