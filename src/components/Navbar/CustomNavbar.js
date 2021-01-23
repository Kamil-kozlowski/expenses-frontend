import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import React, {useState} from "react";
import {useAuth} from "../../auth/authContext";
import {Link} from "react-router-dom";
import RawLink from "../Link/RawLink";

const CustomNavbar = () => {

    let auth = useAuth();
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar expanded={expanded} sticky={'top'} expand="lg" bg="dark" variant="dark" className="position-absolute sticky-top full-width">
            <Navbar.Brand>
                <RawLink to={auth.isAuthenticated ? "/expenses" : "/login"}>
                    Saving pig
                </RawLink>
            </Navbar.Brand>
            {auth.isAuthenticated && (
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)}/>
            )}
            {auth.isAuthenticated && (
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link
                            variant="light"
                            as={Link}
                            to={"/expenses"}
                            onClick={() => setExpanded(false)}
                        >
                            Expenses
                        </Nav.Link>
                        <Nav.Link
                            variant="light"
                            as={Link}
                            to={"/categories"}
                            onClick={() => setExpanded(false)}
                        >
                            Categories
                        </Nav.Link>
                        <NavDropdown title="Add" id="collasible-nav-dropdown">
                            <NavDropdown.Item
                                as={Link}
                                to={"/expenses/edit"}
                                onClick={() => setExpanded(false)}
                            >
                                Expense
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to={"/categories/edit"}
                                onClick={() => setExpanded(false)}
                            >
                                Category
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={() => {
                            auth.logOut();
                            setExpanded(false);
                        }}>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            )}
        </Navbar>
    );
}

export default CustomNavbar;