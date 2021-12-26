import React from 'react'
import { Row, Col } from "react-bootstrap";
import { APP_NAME } from '../constant';
import SiteLogo from "../images/png/site_logo.png"
import "../css/style.css";

const login = (props) => {
    return (
        <section className="container_login">
            <Row>
                <Col md={6} sm={12}>
                    <div className="login_forgotpassword_bg">

                    </div>
                </Col>
                <Col md={6} sm={12}>

                    <section className="loginPg_forms ">
                        <div className="form_field">
                            <div className="text-center">
                                <img src={SiteLogo} alt="logo" className="site_logo" />
                            </div>
                            <div className="site_header">{APP_NAME} </div>


                            <div className="page_title">
                                {/* Login */}
                                {props.pageTitle}
                            </div>

                            <div>
                                {props.InputForms}
                            </div>
                            {/*  */}
                        </div>
                    </section>

                </Col>
            </Row>
        </section >
    )
}

export default login;
