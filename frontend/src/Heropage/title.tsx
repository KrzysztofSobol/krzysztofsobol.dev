import { useState, useEffect } from 'react';

interface ScreenState {
    src: string;
    className: string;
}

function Title() {
    const [screenState, setScreenState] = useState<ScreenState | null>(null);


    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 700px)');

        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setScreenState({
                src: event.matches ? "/logoKS.svg" : "/title.svg",
                className: event.matches ? "title-small" : "title",
            });
        };

        setScreenState({
            src: mediaQuery.matches ? "/logoKS.svg" : "/title.svg",
            className: mediaQuery.matches ? "title-small" : "title",
        });

        // listener
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    if (screenState === null) {
        return null;
    }

    return (
        <img
            className={screenState.className + " unselectable"}
            src={screenState.src}
            alt="title image"
        />
    );
}

export default Title;