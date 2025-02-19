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
            <div className={`projects-section ${isVisible ? 'visible' : ''}`}>
                <h2>{"<Projects/>"}</h2>
                <Project name={"Map generation"}
                         description={"It's a fast wave function collapse algorithm, its being used for generating the main background of the website."}
                         techStack={['Java', 'DSA']}
                         link={"https://github.com/KrzysztofSobol"} />
                <Project name={"krzysztofsobol.xyz"}
                         description={"That is a website you are currently on, so welcome. It was supposed to be more of a backend project and it turned out to be a huge frontend learning experience."}
                         techStack={['Java', 'React', 'CSS']}
                         link={"https://github.com/KrzysztofSobol/krzysztofsobol.xyz"} />
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