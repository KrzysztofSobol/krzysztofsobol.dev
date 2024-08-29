import React, { useRef, useEffect, useState } from "react";
import Map from "./map.jsx";
import Title from "./title.jsx";
import ScrollButton from "./buttonScroll.jsx";
import ButtonHeader from "./buttonHeader.jsx";
import Footer from "./footer.jsx";
import AboutMeNew from "./aboutMeNew.jsx";
import ProjectsNew from "./ProjectsNew.jsx";
import NewContact from "./newContact.jsx";

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
            <AboutMeNew />
            <ProjectsNew />
            <NewContact />
            <Footer />
        </div>
    );
}

export default App;
