// ProjectsNew.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmblaCarousel from "./CarouselNew.jsx";

function ProjectsNew() {
    const [projects, setProjects] = useState(() => {
        const storedData = localStorage.getItem('projectsData');
        return storedData ? JSON.parse(storedData) : [];
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/projects')
            .then(response => {
                setProjects(response.data);
                localStorage.setItem('projectsData', JSON.stringify(response.data));
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    if (error && projects.length === 0) {
        return (
            <div>
                <h2>Error loading projects</h2>
                <p>{error}</p>
                <p>Please try refreshing the page. If the problem persists, please contact me.</p>
            </div>
        );
    }

    return (
        <div id="projects" className="aboutMe-container">
            <img className={"background-img"} src="/map_2.png" alt="BackgroundMap"/>
            <div className="color-overlay"></div>
            <div className="carousel-tile">
                {projects.length > 0 ? (
                    <EmblaCarousel projects={projects} />
                ) : (
                    <p>No projects available at the moment.</p>
                )}
            </div>
        </div>
    );
}

export default ProjectsNew;