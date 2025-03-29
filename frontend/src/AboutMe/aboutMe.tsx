import { useEffect, useState } from 'react';
import './aboutMe.css';

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
        <div id="aboutMe" className="page aboutMe-page">
            <div className={`about-section ${isVisible ? 'visible' : ''}`}>
                {/* Main Content Container */}
                <div className="content-container">
                    <div className="content-grid">
                        {/* Left Column - Main Content */}
                        <div className="main-content">
                            <h2>Hello World!</h2>
                            <p>
                                Hey, I'm <span className="highlight">Krzysztof Sobolewski</span>, a <span
                                className="highlight">CS student</span> from Poland.
                                I’m into <span className="highlight">Java</span>, <span className="highlight">web development</span>,
                                and <span className="highlight">solving algorithmic problems</span> for fun.
                                I love <span className="highlight">building stuff</span> and figuring out how things work under the hood.
                                Always <span className="highlight">learning</span> and <span className="highlight">experimenting</span>, whether it's a new framework, a tricky algorithm, or just a cool side project.
                            </p>

                            {/* Skills Container */}
                            <div className="skills-container">
                                <h3>{"> Main Skills"}</h3>
                                <div className="skills-grid">
                                    {['Java', 'React', 'Backend', 'Frontend', 'DSA'].map((skill) => (
                                        <span key={skill} className="tag">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="terminal-info">
                                <p>$ status: available for opportunities</p>
                                <p>$ location: Poland</p>
                                <p>$ specialization: Web development</p>
                            </div>
                        </div>
                        <img className="profile-picture" src="/ProfilePicture.png" alt="Description of the image"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;