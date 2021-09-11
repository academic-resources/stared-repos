import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavBar = ({title, icon}) => {
    return (
        <div className="navbar bg-primary">
            <h1>{title}</h1> 
            <img />
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/sign-up">Sign-Up</Link>
                </li>

                <li>
                    <Link to="/strains">Strains</Link>
                </li>

            </ul>
            
        </div>
    )
}

NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

NavBar.defaultProps = {
    title: 'WeedGotcha',
    icon: 'fas fa-id-card-alt'
}

export default NavBar; 
