import CarouselJustImages from "./carouselJustImages.jsx";

function Project({ title, description, source, className, images }) {

    return (
        <div className={`project-card ${className}`}>
            <h1 className="project-title">{title}</h1>
            <p className="project-description">{description}</p>
            <CarouselJustImages images={images}/>
        </div>
    );
}

export default Project;
