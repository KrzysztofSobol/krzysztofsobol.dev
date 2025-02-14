import Heropage from "./Heropage/heropage.tsx";
import AboutMe from "./AboutMe/aboutMe.tsx";
import Footer from "@/Footer/footer.tsx";
import Projects from "@/Projects/projects.tsx";

function App() {
    return (
        <>
            <Heropage />
            <div className="main-content">
                <div className="background-effects">
                    <div className="ambient-dots"></div>
                    <div className="background-flares"></div>
                </div>
                <AboutMe/>
                <Projects/>
            </div>
            <Footer/>
        </>
    );
}

export default App;
