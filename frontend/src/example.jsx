import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Example() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/mapdata')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}> {post.x + " " + post.y + " " + post.letter}</li>
            ))}
        </ul>
    );
}

export default Example