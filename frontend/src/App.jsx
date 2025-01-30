import React, { useRef, useEffect, useState } from "react";
import Map from "./Heropage/map.jsx";
import ButtonHeader from "./Navbar/buttonHeader.jsx";
import Footer from "./footer.jsx";
import ProjectsNew from "./ProjectsNew.jsx";
import NewContact from "./newContact.jsx";
import AboutMe from "./AboutMe/aboutMe.jsx";

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
            <ButtonHeader />
            <AboutMe />
            <ProjectsNew />
            <NewContact />
            <Footer />
        </>
    );
}

export default App;
