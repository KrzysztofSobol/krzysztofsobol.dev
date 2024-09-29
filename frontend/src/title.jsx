import React, { useState, useEffect } from 'react';

function Title() {
    const [screenState, setScreenState] = useState(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 700px)');

        const handleMediaQueryChange = (event) => {
            setScreenState({
                isSmall: event.matches,
                src: event.matches ? "/logoKS.svg" : "/title.svg",
                className: event.matches ? "title-small" : "title"
            });
        };

        // Set the initial value
        handleMediaQueryChange(mediaQuery);
        // listener
        mediaQuery.addListener(handleMediaQueryChange);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    if (screenState === null) {
        return null;
    }

    return (
        <img
            className={screenState.className}
            src={screenState.src}
            alt="title image"
        />
    );
}

export default Title;