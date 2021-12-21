import React from 'react';
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/loginLayout";

const Login = () => {
    let navigate = useNavigate();

    const loginFields = () => {
        return (
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="mb-3">Email Address</Form.Label>
                    <Form.Control type="email" placeholder="danielrich@company.com" />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="mb-3">Password</Form.Label>
                    <Form.Control type="password" placeholder="**********" />
                </Form.Group>


                <div className="nxt_pg_link" onClick={() => { navigate("/forgot_password") }}>
                    Forgot Password ?
                </div>

                <div className="text-center">
                    <Button variant="primary" type="submit" onClick={() => { navigate("/home") }}>
                        Login
                    </Button>
                </div>
            </Form>
        )
    }
    return (
        <>
            <LoginComponent pageTitle="Login" InputForms={loginFields()} />
        </>
    )
}

export default Login;
