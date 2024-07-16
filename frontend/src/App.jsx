import Map from "./map.jsx";
import Title from "./title.jsx";
import AboutMe from "./aboutMe.jsx";
import ScrollButton from "./buttonScroll.jsx";
import ButtonHeader from "./buttonHeader.jsx";

function App() {
    return (
        <div className="map-container">
            <Map/>
            <ScrollButton target={"aboutMe"}/>
            <ButtonHeader/>
            <Title/>
            <AboutMe/>
        </div>
    );
}

export default App
