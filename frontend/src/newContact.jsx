import Contact from "./contact.jsx";

function contact(){
    return (
        <div id={"aboutMe"} className="aboutMe-container">
            <img className={"background-img"} src={"/map_3.png"} alt={"BackgroundMap"}/>
            <div className={"color-overlay"}></div>
            <div className="contact-tile">
                <Contact/>
            </div>
        </div>
    );
}

export default contact;