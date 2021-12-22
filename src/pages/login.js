import React, { useState } from 'react';
import { Input } from "antd";
import { useNavigate } from 'react-router';
import Logo from "../assets/image/png/Logo.png";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./login.css";

const Login = () => {


    return (
        <>    {/*Login Page*/}

            <Row>
                <Col lg={6} md={6} sm={12} >
                    {/*Back ground image*/}
                    <div className="login_bg"></div>
                </Col>
                {/*login form*/}
                <Col lg={6} md={6} sm={12} >

                    <div className="row ">
                        <div className="col-1 "></div>
                        <div className="col-10 ">
                            <div className="py-5 mt-4">
                                <div className="text-center justify-content-center ">
                                    <img src={Logo} alt="logo" />
                                    <h1 className="pt-5">Site Cloud</h1>
                                </div>
                                <div className="pt-4 ">
                                    <h4>Login</h4>
                                    <Form className="pt-3 pr-5">
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label className="color_two">Email address</Form.Label>
                                            <Form.Control type="email" placeholder="&nbsp;&nbsp;Enter email" />

                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGroupPassword">
                                            <Form.Label className="color_two">Password</Form.Label>
                                            <Form.Control type="password" placeholder="&nbsp;&nbsp;Password" className="pl-3" />
                                        </Form.Group>
                                    </Form>

                                    <p className="color_three">Forgot Password?</p>
                                </div>
                                <div className="text-center justify-content-center pt-3 ">
                                    <Button >Login</Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </Col>
            </Row>
        </>

    )
}

export default Login;

