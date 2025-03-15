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
                <Project name={"spring-boot-backend"}
                         description={"A basic REST API built with Spring Boot, with Mockito tests included. Nothing groundbreaking, just a simple project I made to get comfortable with Spring Boot and learn the backend fundamentals."}
                         techStack={['Java', 'Postgres', 'JDBC', 'Mockito']}
                         link={"https://github.com/KrzysztofSobol/Spring-boot-backend"} />
                <Project name={"Lox"}
                         description={"A free and open-source password manager — simple, yet powerful. Built with Python, SQLite, and Textual, it keeps your passwords safe and organized without unnecessary complexity."}
                         techStack={['Python', 'SQLite', 'Textual']}
                         link={"https://github.com/KrzysztofSobol/Lox"} />
                <Project name={"undead vision"}
                         description={"A 2D rogue-like horror game developed in WPF using C#. Created in 48 hours during a Game Jam, with the theme \"Vision\". The main mechanic? Limited visibility, with only a lamp to light your way — so watch your back!"}
                         techStack={['C#', 'WPF']}
                         link={"https://github.com/Maison16/Undead-Vision"} />
                <Project name={"and much more on GitHub"}
                         description={"...and many more projects on my GitHub, from small experiments to bigger, more complex builds. Feel free to check them out!"}
                         techStack={[]}
                         link={"https://github.com/KrzysztofSobol"} />
            </div>
        </div>
    );
}

export default Projects;