import React from 'react';
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/loginLayout";

const ForgotPassWord = () => {
    let navigate = useNavigate();
    const enterEmail = () => {
        return (
            <>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="mb-3">Enter Your Email address</Form.Label>
                        <Form.Control type="email" placeholder="danielrich@company.com" />

                    </Form.Group>


                    <div className="nxt_pg_link" onClick={() => { navigate("/login") }}>
                        Back to Login
                    </div>

                    <div className="text-center">
                        <Button variant="primary" type="submit" onClick={() => { navigate("/home") }}>
                            Send Password Reset Link
                        </Button>
                    </div>
                </Form>
            </>
        )
    }
    return (
        <>
            <LoginComponent pageTitle="Forgot Password" InputForms={enterEmail()} />
        </>
    )

}

export default ForgotPassWord;
