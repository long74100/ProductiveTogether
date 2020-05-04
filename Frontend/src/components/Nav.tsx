import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { removeAccessTokens } from '../services/authService';

const NavComponent = () => (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link className='navbar-brand' to='/'>[Productive]</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Link className='nav-link' to='/mygoals'>My Goals</Link>
                <Link className='nav-link' to='/dailygoal'>Zone</Link>
            </Nav>
            <Nav>
                <NavDropdown title={<FontAwesomeIcon icon={faUserCircle} size='2x' style={{ color: 'white' }} />} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={removeAccessTokens}>Sign out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default NavComponent;