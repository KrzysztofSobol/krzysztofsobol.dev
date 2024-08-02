function Project({ title, description, source, className }) {
    return (
        <div className={`project-card ${className}`}>
            <h1 className="project-title">{title}</h1>
            <p className="project-description">{description}</p>
            <div className="image-container">
                <img className="project-img" src={source} alt="image for a project"/>
            </div>
        </div>
    );
}

export default Project;
