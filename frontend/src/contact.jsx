function Contact(){
    return(
        <div id={"contact"} className={"Tile Contact"}>
            <h1 className={"AboutMeTitle"}>
                <svg className={"contactSvg"} width="80px" height="80px" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 10H8.01" stroke="#2D8D9A" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path d="M12 10H12.01" stroke="#2D8D9A" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path d="M16 10H16.01" stroke="#2D8D9A" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path
                        d="M21 13V7C21 5.11438 21 4.17157 20.4142 3.58579C19.8284 3 18.8856 3 17 3H7C5.11438 3 4.17157 3 3.58579 3.58579C3 4.17157 3 5.11438 3 7V13C3 14.8856 3 15.8284 3.58579 16.4142C4.17157 17 5.11438 17 7 17H7.5C7.77614 17 8 17.2239 8 17.5V20V20.1499C8 20.5037 8.40137 20.7081 8.6875 20.5L13.0956 17.2941C13.3584 17.103 13.675 17 14 17H17C18.8856 17 19.8284 17 20.4142 16.4142C21 15.8284 21 14.8856 21 13Z"
                        stroke="#2D8D9A" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                <header className={"headerTextContact"}>Contact</header>
            </h1>
            <h2w className="ContactContent" title="email">
                <svg width="50px"
                     height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#FFFFFF"
                       strokeWidth="0.048"/>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M10 19H6.2C5.0799 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V10M20.6067 8.26229L15.5499 11.6335C14.2669 12.4888 13.6254 12.9165 12.932 13.0827C12.3192 13.2295 11.6804 13.2295 11.0677 13.0827C10.3743 12.9165 9.73279 12.4888 8.44975 11.6335L3.14746 8.09863M14 21L16.025 20.595C16.2015 20.5597 16.2898 20.542 16.3721 20.5097C16.4452 20.4811 16.5147 20.4439 16.579 20.399C16.6516 20.3484 16.7152 20.2848 16.8426 20.1574L21 16C21.5523 15.4477 21.5523 14.5523 21 14C20.4477 13.4477 19.5523 13.4477 19 14L14.8426 18.1574C14.7152 18.2848 14.6516 18.3484 14.601 18.421C14.5561 18.4853 14.5189 18.5548 14.4903 18.6279C14.458 18.7102 14.4403 18.7985 14.405 18.975L14 21Z"
                            stroke="#FFFFFF" strokeWidth="1.26" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                </svg>
                <p className={"contactText"}>krzysieksobol9@gmail.com</p>
            </h2w>
            <h3 className="ContactContent" title="discord">
                <svg
                    width="52px"
                    height="52px"
                    viewBox="0 0 48.00 48.00" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" strokeWidth="2.4" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC"
                       strokeWidth="0.096"/>
                    <g id="SVGRepo_iconCarrier">
                        <defs>
                            <style>
                                {`.a {fill: none; stroke: #FFFFFF; stroke-linecap: round; stroke-linejoin: round;}`}
                            </style>
                        </defs>
                        <path className="a"
                              d="M17.59,34.1733c-.89,1.3069-1.8944,2.6152-2.91,3.8267C7.3,37.79,4.5,33,4.5,33A44.83,44.83,0,0,1,9.31,13.48,16.47,16.47,0,0,1,18.69,10l1,2.31A32.6875,32.6875,0,0,1,24,12a32.9643,32.9643,0,0,1,4.33.3l1-2.31a16.47,16.47,0,0,1,9.38,3.51A44.8292,44.8292,0,0,1,43.5,33s-2.8,4.79-10.18,5a47.4193,47.4193,0,0,1-2.86-3.81m6.46-2.9c-3.84,1.9454-7.5555,3.89-12.92,3.89s-9.08-1.9446-12.92-3.89"/>
                        <circle className="a" cx="17.847" cy="26.23" r="3.35"/>
                        <circle className="a" cx="30.153" cy="26.23" r="3.35"/>
                    </g>
                </svg>
                <p className={"contactText"}>@kexsu</p>
            </h3>
        </div>
    );
}

export default Contact;