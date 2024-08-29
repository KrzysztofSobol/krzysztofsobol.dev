import AboutMe from "./aboutMe.jsx";

function newContact(){
    return (
        <div id={"aboutMe"} className="aboutMe-container">
            <img src={"/map_3.png"} alt={"BackgroundMap"}/>
            <div className={"color-overlay"}></div>
            <div className="aboutMe-tile">
            </div>
        </div>
    );
}

export default newContact;