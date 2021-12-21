import React, { useState } from 'react';
import { Input} from "antd";
import { useNavigate } from 'react-router';
import Logo from "../assets/image/png/Logo.png";
import { Form, Row, Col, Button} from "react-bootstrap";
import "./login.css";

const Login = () => {


    return (
        <>    {/*Login Page*/}

            <Row>
                <Col md={6} sm={12} >
                    {/*Back ground image*/}
                    <div className="login_bg"></div>
                </Col>
                {/*login form*/}
                <Col md={6} sm={12} >
                    <div className="py-5 mt-3">
                    <div className="text-center justify-content-center ">
                        <img src={Logo} alt="logo" />
                        <h1 className="pt-4">Site Cloud</h1>
                    </div>
                    <div  className="pt-4 form_padding">
                    <h4>Login</h4>
                        <Form className="pt-3">
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label className="color_two">Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label className="color_two">Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" className="pl-3"/>
                            </Form.Group>
                        </Form>
                    
                    <p className="color_three">Forgot Password?</p>
                    </div>
                    <div className="text-center justify-content-center pt-5 ">
                    <Button className="px-6">Login</Button>
                    </div>
                    </div>
                </Col>
            </Row>
        </>

    )
}

export default Login;

