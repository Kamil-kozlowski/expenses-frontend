import {useAuth} from "../../auth/authContext";
import React, {useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {Redirect} from "react-router";
import {Col, Container, Row} from "react-bootstrap";
import "./Login.css"

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [badCreds, setBadCreds] = useState(false);

    let auth = useAuth();

    function login(e) {
        e.preventDefault();
        auth.logIn(username, password)
            .then(() => setBadCreds(false))
            .catch(() => setBadCreds(true));
    };

    return (
        <Container className="align-items-center d-flex flex-column justify-content-center">
            <img src={"expenses.png"} className={"logo"} alt={"/"}/>
            {auth.isAuthenticated ?
                <Redirect to={{
                    pathname: "/expenses"
                }}/> : (
                    <Container as={Col} sm="12" md="8" lg="6" className={"d-flex flex-column justify-content-center"}>
                        <Form onSubmit={login}>
                            <Form.Group controlId="formUsername">
                                <Form.Control
                                    style={{opacity: '0.95'}}
                                    size="lg"
                                    type="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Control
                                    style={{opacity: '0.95'}}
                                    size="lg"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            {badCreds && <p className="warning text-center">Unable to login</p>}
                            <Row className="justify-content-center">
                                <Button variant="dark" type="submit" size={"md"}>
                                    Log in!
                                </Button>
                            </Row>
                        </Form>
                    </Container>)}
        </Container>
    );
}

export default Login;