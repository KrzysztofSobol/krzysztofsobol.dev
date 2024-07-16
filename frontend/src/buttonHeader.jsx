function ButtonHeader(){
    const handleScroll = () => {
        const section = document.getElementById("aboutMe");
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <div className={"buttonHeader"}>
            <button className={"button"} onClick={handleScroll}>about me</button>
            <button className={"button"}>projects</button>
            <button className={"button"}>education</button>
        </div>
    );
}

export default ButtonHeader;