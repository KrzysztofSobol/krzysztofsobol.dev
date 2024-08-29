import AboutMe from "./aboutMe.jsx";

function AboutMeNew() {
    return(
        <div id={"aboutMe"} className="aboutMe-container">
            <img src={"/map_1.png"} alt={"BackgroundMap"}/>
            <div className={"color-overlay"}></div>
            <div className="aboutMe-tile">
                <AboutMe/>
                <img src="/profilePicture.png" alt="Profile" className="profile-picture"/>
            </div>
        </div>
    );
}

export default AboutMeNew;
