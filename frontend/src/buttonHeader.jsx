import React, { useEffect, useRef } from 'react';

function ButtonHeader() {
    const headerRef = useRef(null);
    const placeholderRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const header = headerRef.current;
            const placeholder = placeholderRef.current;
            const headerRect = header.getBoundingClientRect();
            const placeholderRect = placeholder.getBoundingClientRect();

            if (headerRect.top <= 0 && !header.classList.contains('sticky')) {
                header.classList.add('sticky');
                placeholder.style.display = 'block';
            } else if (placeholderRect.top >= 0 && header.classList.contains('sticky')) {
                header.classList.remove('sticky');
                placeholder.style.display = 'none';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            const headerOffset = headerRef.current.offsetHeight;
            const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 22;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <div ref={placeholderRef} className="placeholder"></div>
            <div ref={headerRef} className="buttonHeader">
                <button className="button" onClick={() => handleScrollToSection('aboutMe')}>about me</button>
                <button className="button" onClick={() => handleScrollToSection('projects')}>projects</button>
                <button className="button" onClick={() => handleScrollToSection('education')}>education</button>
                <button className="button" onClick={() => handleScrollToSection('contact')}>contact</button>
            </div>
        </>
    );
}

export default ButtonHeader;
