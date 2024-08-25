import AboutMe from "./aboutMe.jsx";
import CarouselNew from "./CarouselNew.jsx";
import EmblaCarousel from "./CarouselNew.jsx";

function ProjectsNew(){

    const OPTIONS = {}
    const SLIDE_COUNT = 7
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

    return (
        <div id={"projects"} className="aboutMe-container">
            <img src={"/map_2.png"} alt={"BackgroundMap"}/>
            <div className={"color-overlay"}></div>
            <div className="carousel-tile">
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
        </div>
    );
}

export default ProjectsNew;