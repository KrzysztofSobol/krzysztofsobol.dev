import React from "react";

function ScrollButton({ headerHeight }) {
    const handleScroll = () => {
        const section = document.getElementById('aboutMe');
        if (section) {
            const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight + 40;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <svg className="buttonScroll" onClick={handleScroll} width="70px" height="70px" viewBox="180.59 105.544 16.095 16.622" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M 195.635 106.566 L 189.342 112.858 C 188.951 113.249 188.318 113.249 187.927 112.858 L 181.635 106.566"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ paintOrder: 'fill', fillRule: 'nonzero', fill: 'rgba(255, 255, 255, 0)', stroke: 'rgb(15 44 55)' }}
            />
            <path
                d="M 195.635 114.566 L 189.342 120.858 C 188.951 121.249 188.318 121.249 187.927 120.858 L 181.635 114.566"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ paintOrder: 'fill', fillRule: 'nonzero', fill: 'rgba(252, 0, 0, 0)', stroke: 'rgb(15 44 55)' }}
            />
        </svg>
    );
}

export default ScrollButton;
