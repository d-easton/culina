import React from 'react';
import * as ROUTE from 'react-router-dom'
import * as RBS from 'react-bootstrap';
import './css/Navbar.css';


const Navbar = (props) => {

    const { user, handleSignout } = props;

    return (

        <nav className="fix">
            {user ? (
                <RBS.Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <RBS.Navbar.Brand href="/">
                        Culina
                        <i className="fas fa-stroopwafel"></i>
                    </RBS.Navbar.Brand>
                    <RBS.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <RBS.Navbar.Collapse id="responsive-navbar-nav">
                        <RBS.Nav className="mr-auto">
                        </RBS.Nav>
                        <RBS.Nav>
                            <RBS.Nav.Link href="/grocery-list">Grocery List</RBS.Nav.Link>
                            <RBS.Nav.Link href="/recipe-list">Recipes</RBS.Nav.Link>
                            <RBS.Nav.Link href="/calendar">Calendar</RBS.Nav.Link>
                            <RBS.Nav.Link href="/top">Top</RBS.Nav.Link>
                            {/* <RBS.Nav.Link href="/services">Services</RBS.Nav.Link>
                            <RBS.Nav.Link href="/products">Products</RBS.Nav.Link> */}
                        </RBS.Nav>
                        <RBS.Nav>
                            <RBS.Nav.Link onClick={handleSignout} href="/">Sign-Out</RBS.Nav.Link>
                        </RBS.Nav>
                    </RBS.Navbar.Collapse>
                </RBS.Navbar>
            ) 
            : 
            (
                <RBS.Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <RBS.Navbar.Brand href="/">
                        Culina
                        <i class="fas fa-stroopwafel"></i>
                    </RBS.Navbar.Brand>
                    <RBS.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <RBS.Navbar.Collapse id="responsive-navbar-nav">
                        <RBS.Nav className="mr-auto">
                        </RBS.Nav>
                        <RBS.Nav>
                            <RBS.Nav.Link href="/sign-in">Sign-In</RBS.Nav.Link>
                            <RBS.Nav.Link href="/sign-up">Sign-Up</RBS.Nav.Link>
                        </RBS.Nav>
                    </RBS.Navbar.Collapse>
                </RBS.Navbar>
            )
            }

        </nav>    
    );

};

export default Navbar;
