import React from 'react';

function AsciiArt() {
    return (
        <div className={"titleContainer"}>
        <pre className={"title"}>{' _  __                       _         __ _____       _           _'}</pre>
        <pre className={"title"}>{'| |/ /                      | |       / _/ ____|     | |         | |'}</pre>
        <pre className={"title"}>{'| \' / _ __ _____   _ ___ ___| |_ ___ | || (___   ___ | |__   ___ | |'}</pre>
        <pre className={"title"}>{'|  < | \'__|_  / | | / __|_  / __/ _ \\|  _\\___ \\ / _ \\| \'_ \\ / _ \\| |'}</pre>
        <pre className={"title"}>{'| . \\| |   / /| |_| \\__ \\/ /| || (_) | | ____) | (_) | |_) | (_) | |'}</pre>
        <pre className={"title"}>{'|_|\\_\\_|  /___|\\__, |___/___|\\__\\___/|_||_____/ \\___/|_.__/ \\___/|_|'}</pre>
        <pre className={"titlelast2"}>{'__/ |'}</pre>
        <pre className={"titlelast"}>{'|___/'}</pre>
        </div>
    );
}

export default AsciiArt;