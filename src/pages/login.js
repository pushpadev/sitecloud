import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/loginLayout";
import useStateWithValidation from "../hooks/useStateWithValidation";

const Login = () => {
    const navigate = useNavigate();

    const [
        userEmailInput,
        setUserEmailInput,
    ] = useState("");

    const [checkValidation, setCheckValidation] = useState(false);

    const [
        userpasswordInput,
        setUserPasswordInput,
        validPassword,
    ] = useStateWithValidation((password) => password.length >= 6, "");

    const [logininputs, setLoginInputs] = useState({});

    const [passwordRequired, setpasswordRequired] = useState(false);
    const [emailRequired, setEmailRequired] = useState(false);
    const [checkEmailVaidation, setCheckEmailVaildation] = useState(false);

    const onChangeEmailInput = (e) => {
        setUserEmailInput(e.target.value);
        setEmailRequired(false);
        setCheckEmailVaildation(false);
    };

    const onChangePasswordInput = (e) => {
        setUserPasswordInput(e.target.value);
        setpasswordRequired(false);
    };

    const validate = () => {
        if (userpasswordInput === "" || userpasswordInput === undefined) {
            setpasswordRequired(true);
        }
        if (userEmailInput === "" || userEmailInput === undefined) {
            setEmailRequired(true);
        }
        if (!userpasswordInput && !userEmailInput) {
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {
            setCheckValidation(true);
            setpasswordRequired(false);
            setEmailRequired(false);
            try {
                const checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (checkEmail.test(String(userEmailInput).toLowerCase()) === false) {
                    setCheckEmailVaildation(true);
                }

                else {
                    let credentials = {
                        email: userEmailInput,
                        password: userpasswordInput,
                    };
                    setLoginInputs(credentials);

                    if (validPassword.toString() == "true") {
                        navigate("/home");
                    }
                }
            } catch (error) {
                console.log("error", error);
            }
        }
    };
    const loginFields = () => {
        return (
            <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="mb-3">Email Address</Form.Label>
                    <Form.Control placeholder="danielrich@company.com"

                        name="userEmailInput"
                        value={userEmailInput}
                        onChange={onChangeEmailInput} />
                    {
                        emailRequired && (
                            <>
                                <Form.Text className="text-danger tracking-in-contract">*Email ID is required</Form.Text>
                            </>
                        )
                    }
                    {
                        checkEmailVaidation && (
                            <>
                                <Form.Text className="text-danger tracking-in-contract">*Email is not valid</Form.Text>
                            </>
                        )
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="mb-3">Password</Form.Label>
                    <Form.Control type="password" placeholder="**********" name="userpasswordInput"
                        value={userpasswordInput}
                        onChange={onChangePasswordInput} />
                    {passwordRequired
                        && (
                            <>
                                <Form.Text className="text-danger tracking-in-contract">*Password is required</Form.Text>
                            </>
                        )}

                    {/* passord length validation */}
                    {
                        checkValidation === true && validPassword === false && (
                            <>
                                <Form.Text className="text-danger tracking-in-contract">*Password must have minimum 6 characters</Form.Text>
                            </>
                        )}
                </Form.Group>


                <div className="nxt_pg_link" onClick={() => { navigate("/forgot_password") }}>
                    Forgot Password ?
                </div>

                <div className="text-center">
                    <Button variant="primary" type="submit" >
                        Login
                    </Button>
                </div>
            </form>
        )
    }
    return (
        <>
            <LoginComponent pageTitle="Login" InputForms={loginFields()} />
        </>
    )
}

export default Login;
