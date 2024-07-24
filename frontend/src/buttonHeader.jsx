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
                <svg className={"ksLogo"} onClick={() => handleScrollToSection('main')} viewBox="0 23.9 488.392 476.1"
                     width="45" height="45" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{stopColor: '#264653', stopOpacity: 1}}/>
                            <stop offset="100%" style={{stopColor: '#6EC1E4', stopOpacity: 1}}/>
                        </linearGradient>
                    </defs>
                    <g transform="matrix(0.09405600279569626, 0, 0, -0.09678499400615692, -168.77427673339844, 803.7086181640625)"
                       fill="url(#grad1)" stroke="none">
                        <path
                            d="M1810 5590 l0 -2440 540 0 540 0 2 808 3 807 279 -415 c765 -1138&#10;788 -1170 816 -1185 25 -13 127 -15 693 -15 676 0 773 4 992 41 772 129 1215&#10;536 1284 1181 41 374 -39 714 -226 963 -67 89 -205 225 -302 298 -162 121&#10;-426 262 -731 392 -250 106 -439 200 -559 279 l-101 65 -62 -51 c-100 -82&#10;-315 -304 -410 -423 -49 -60 -125 -163 -170 -229 l-81 -119 24 -20 c82 -66&#10;318 -187 569 -291 235 -98 478 -216 600 -291 105 -66 241 -193 283 -265 39&#10;-67 60 -162 54 -240 -17 -223 -193 -373 -514 -437 -96 -19 -418 -25 -525 -10&#10;l-58 8 -598 827 c-330 455 -605 836 -611 847 -11 18 -4 34 55 130 141 231 246&#10;377 393 550 385 452 874 754 1368 847 95 18 155 22 308 22 256 1 435 -30 670&#10;-116 111 -41 306 -133 383 -182 l42 -26 -2 491 -3 492 -70 24 c-109 37 -290&#10;81 -426 103 -119 19 -167 20 -1185 20 l-1060 0 -52 -26 c-30 -15 -70 -47 -96&#10;-77 -24 -29 -249 -362 -501 -742 -251 -379 -461 -694 -466 -699 -5 -6 -9 294&#10;-9 767 l0 777 -540 0 -540 0 0 -2440z"/>
                    </g>
                </svg>

                <button className="button" onClick={() => handleScrollToSection('aboutMe')}>about me</button>
                <button className="button" onClick={() => handleScrollToSection('projects')}>projects</button>
                <button className="button" onClick={() => handleScrollToSection('education')}>education</button>
                <button className="button" onClick={() => handleScrollToSection('contact')}>contact</button>
            </div>
        </>
    );
}

export default ButtonHeader;
