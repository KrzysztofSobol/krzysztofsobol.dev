function Project({ title, description }) {
    return (
        <div className="Tile project-card">
            <h1 className="AboutMeTitle">{title}</h1>
            <p className="project-description">{description}</p>
            <img src={"Xd"} alt={"image for a project"}/>
        </div>
    );
}

export default Project;
