import AboutMe from "./aboutMe.jsx";
import Contact from "./contact.jsx";

function newContact(){
    return (
        <div id={"aboutMe"} className="aboutMe-container">
            <img src={"/map_3.png"} alt={"BackgroundMap"}/>
            <div className={"color-overlay"}></div>
            <div className="contact-tile">
                <Contact/>
            </div>
        </div>
    );
}

export default newContact;