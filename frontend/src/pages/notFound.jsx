import React from 'react'
import Structure from '../components/Structure';
import Tail from '../components/Tail';

function NotFound() {
    return <div>
        <Structure/>
        <h1>404 Not Found</h1>
        <p>The page you're looking for doesn't exist!</p>
        <Tail/>

    </div>
}

export default NotFound