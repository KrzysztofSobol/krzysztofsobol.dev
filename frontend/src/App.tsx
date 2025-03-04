import Heropage from "./Heropage/heropage.tsx";
import AboutMe from "./AboutMe/aboutMe.tsx";
import Footer from "@/Footer/footer.tsx";
import Projects from "@/Projects/projects.tsx";
import Contact from "@/Contact/contact.tsx";

function App() {
    return (
        <>
            <Heropage />
            <div className="main-content">
                <div className="background-effects">
                    <div className="ambient-dots"></div>

                    <div className="glow-spots">
                        <div className="glow-spot"></div>
                        <div className="glow-spot"></div>
                        <div className="glow-spot"></div>
                    </div>
                </div>
                <AboutMe/>
                <Projects/>
                <Contact/>
            </div>
            <Footer/>
        </>
    );
}

export default App;
