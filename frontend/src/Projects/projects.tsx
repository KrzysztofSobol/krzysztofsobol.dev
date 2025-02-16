import { useEffect, useState } from 'react';
import './projects.css';

function Projects() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set up intersection observer to trigger animation
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        const section = document.querySelector('.projects-section');
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    return (
        <div id="projects" className="page projects-page">
            <div className={`projects-section ${isVisible ? 'visible' : ''}`}>
                <h2>{"<Projects/>"}</h2>
                <div className="content-container">
                    <h2>Map generation</h2>
                    <p>
                        It's a fast wave function collapse algorithm, its being used for generating the main background
                        of the website.
                    </p>
                </div>
                <div className="content-container">
                    <h2>Map generation</h2>
                    <p>
                        It's a fast wave function collapse algorithm, its being used for generating the main background
                        of the website.
                    </p>
                </div>
                <div className="content-container">
                    <h2>Map generation</h2>
                    <p>
                        It's a fast wave function collapse algorithm, its being used for generating the main background
                        of the website.
                    </p>
                </div>
                <div className="content-container">
                    <h2>Map generation</h2>
                    <p>
                        It's a fast wave function collapse algorithm, its being used for generating the main background
                        of the website.
                    </p>
                </div>
                <div className="content-container">
                    <h2>Map generation</h2>
                    <p>
                        It's a fast wave function collapse algorithm, its being used for generating the main background
                        of the website.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Projects;