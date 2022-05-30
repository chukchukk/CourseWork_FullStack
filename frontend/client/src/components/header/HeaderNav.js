import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../../index";
import {useNavigate} from "react-router";
import CreateProject from "../project/CreateProject";
import CreateOrder from "../order/CreateOrder";

export default function HeaderNav () {
    const {userStore} = useContext(Context)
    const navigate = useNavigate()

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Мой аналог Jira</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                        {
                            userStore.isAuth ?
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/workSpace">Рабочий стол</Nav.Link>
                                    <NavDropdown
                                        title="Проект"
                                        menuVariant="dark"
                                    >
                                        <NavDropdown.Item as={CreateProject} />
                                        <NavDropdown.Item as={Link} to="/projects">Список проектов</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link as={Link} to="/orders">Список задач</Nav.Link>
                                </Nav>
                                : null
                        }
                        {
                            userStore.isAuth ?
                                <Nav>
                                    <Button variant={"dark"} onClick={() => {
                                        userStore.logout()
                                        navigate("/")
                                    }}>Logout</Button>
                                </Nav> :
                                <Nav>
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="/registration">
                                        Registration
                                    </Nav.Link>
                                </Nav>
                        }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}