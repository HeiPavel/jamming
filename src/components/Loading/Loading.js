import React, {useEffect} from 'react';
import './Loading.css';

function Loading(props) {
    useEffect(() => {
        const module = document.getElementsByClassName('Loading');
        const loadingContainer = document.getElementsByClassName('loading-container');
        const message = document.getElementsByClassName('noMatch-message');
        if (!props.loading) {
            module[0].className = 'Loading hide';
        } else {
            module[0].className = 'Loading';
        }

        if (props.noMatchMessage) {
            loadingContainer[0].className = 'loading-container hide';
            message[0].className = 'noMatch-message';
        } else {
            loadingContainer[0].className = 'loading-container';
            message[0].className = 'noMatch-message hide'; 
        }
    }, [props.loading, props.noMatchMessage]);

    return (
    <div className="Loading">
        <div className="loading-container">
            <div id="circle">
                <svg height="170px" width="170px">
                    <clipPath id="text">
                        <text x="50%" y="55%" fill="red" textAnchor="middle">Loading</text>
                    </clipPath>
                </svg>
            <div id="target"></div>
            </div>
        </div>
        <h1 className="noMatch-message hide">No match was found. Please check your input and try again.</h1>
    </div>
    );
}

export default Loading;