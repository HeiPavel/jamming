import React, {useState, useEffect} from 'react';
import './AuthButton.css';
import logo from '../../media/img/logo.png';
import {authorization} from '../util/Spotify';

function AuthButton(props) {

    const [className, setClassName] = useState('button');

    useEffect(() => {
        if (window.location.href.includes('access_token')) {
            const button = document.getElementsByClassName('button');
            const paragraph = document.getElementById('log');
            button[0].style.width = '40px';
            paragraph.setAttribute('class', 'loged');
        }
    },[]);

    const addClassName = () => {
        setClassName((prev) => {
            return `${prev} action`;
        });
        setTimeout(() => {
            authorization();
        }, 500);
    }

    return (
        <div className={className}>
            <p id="log">Log In</p>
            <div id="container">
                <img src={logo} alt="" onClick={addClassName} />
            </div>
        </div>
    );
}

export default AuthButton;