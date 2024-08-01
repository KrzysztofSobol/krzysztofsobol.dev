function Project({ title, description, className }) {
    return (
        <div className={`project-card ${className}`}>
            <h1 className="project-title">{title}</h1>
            <p className="project-description">{description}</p>
            <img src={"Xd"} alt={"image for a project"}/>
        </div>
    );
}

export default Project;
