import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

let Header = () => (
    <header className="header">
        <Link to="/" className="link"><div className="app-name">Mews!</div></Link>
    </header>
);

export default Header;