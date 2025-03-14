import { useEffect, useState } from 'react';
import './projects.css';
import Project from "@components/projectTile/project.tsx";

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
            <div className={`projects-section ${isVisible ? 'visible' : ''} main-content`}>
                <h2>{"<Projects/>"}</h2>
                <Project name={"krzysztofsobol.dev"}
                         description={"This is the website you're currently on — welcome! It was meant to be more of a backend project, but ended up becoming a huge frontend learning experience. Oh, and don't miss the custom map generation in the top right corner of the website!\n"}
                         techStack={['Java', 'React', 'TypeScript', 'CSS']}
                         link={"https://github.com/KrzysztofSobol/krzysztofsobol.xyz"} />
                <Project name={"Lox"}
                         description={"A free and open-source password manager — simple, yet powerful. Built with Python, SQLite, and Textual, it keeps your passwords safe and organized without unnecessary complexity."}
                         techStack={['Python', 'SQLite', 'Textual']}
                         link={"https://github.com/KrzysztofSobol/Lox"} />
                <Project name={"Community platform"}
                         description={"Smaller version of apps like discord basicly, it has servers, private messages and video/voice calls."}
                         techStack={['Vue', 'JS']}
                         link={"https://github.com/KrzysztofSobol"} />
                <Project name={"CatchUp"}
                         description={"This project is a solvation of a onboarding problem in the companies, its currently in development, part of my Engineer's Thesis."}
                         techStack={['C#', '.NET', 'React', 'MAUI']}
                         link={"https://github.com/KrzysztofSobol/krzysztofsobol.xyz"} />
            </div>
        </div>
    );
}

export default Projects;