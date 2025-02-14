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
        <div id="projects" className="page">
            <div className={`projects-section ${isVisible ? 'visible' : ''}`}>
                <div className="content-container">
                </div>
            </div>
        </div>
    );
}

export default Projects;