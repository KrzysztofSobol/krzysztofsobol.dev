import { useEffect, useState } from 'react';
import './AboutMe.css';

function AboutMe() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set up intersection observer to trigger animation
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        const section = document.querySelector('.about-section');
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    return (
        <div id="aboutMe" className="page">
            <div className="background-effects">
                <div className="ambient-dots"></div>
                <div className="background-flares"></div>
            </div>
            <div className={`about-section ${isVisible ? 'visible' : ''}`}>
                {/* Main Content Container */}
                <div className="content-container">
                    <div className="content-grid">
                        {/* Left Column - Main Content */}
                        <div className="main-content">
                            <h2>Hello World!</h2>
                            <p>
                                I'm <span className="highlight">Krzysztof Sobolewski</span>, a young <span
                                className="highlight">developer</span> and <span
                                className="highlight">CS student</span> from
                                Poland. I love diving into <span className="highlight">Java</span> and have a fondness
                                for <span className="highlight">C++</span> from when I first started coding.
                                I'm <span className="highlight">always</span> up for a <span
                                className="highlight">new challenge</span> and <span
                                className="highlight">constantly learning</span> new things in the tech.
                                I particularly love <span className="highlight">solving algorithmic</span> problems.
                            </p>

                            {/* Skills Container */}
                            <div className="skills-container">
                                <h3>{"> Skills"}</h3>
                                <div className="skills-grid">
                                    {['Java', 'React', 'Backend', 'Frontend', 'DSA'].map((skill) => (
                                        <span key={skill} className="skill-tag">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="terminal-info">
                                <p>$ status: available for opportunities</p>
                                <p>$ location: Poland</p>
                                <p>$ specialization: algorithms & data structures</p>
                            </div>
                        </div>
                        <img src={"https://placehold.co/500x350"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;