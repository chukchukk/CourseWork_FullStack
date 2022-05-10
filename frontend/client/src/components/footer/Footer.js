import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar, NavbarBrand} from "react-bootstrap";

function Footer() {
    return (
        <div className="fixed-bottom">
            <Navbar bg="dark" variant="dark" fixed={"bottom"}>
                <Container>
                    <NavbarBrand>Footer</NavbarBrand>
                </Container>
            </Navbar>
        </div>
    )
}

export default Footer