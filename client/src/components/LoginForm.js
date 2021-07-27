import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { Form, Button, Alert } from "react-bootstrap";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const LoginForm = () => { //props
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(userFormData);

    // check if form has everything (as per react-bootstrap docs)
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    try {
      // const form = event.currentTarget;
      // if (form.checkValidity() === false) {
      //   console.log("test if")
      //   event.preventDefault();
      //   event.stopPropagation();
      //   throw new Error("error");

      // }else{
  
      setValidated(true);

      const { data } = await loginUser({
        variables: { ...userFormData },
      });
      // console.log(userFormData);
      console.log("through");
      Auth.login(data.login.token, userFormData.email);
    // }

      // window.location.reload()
    } catch (err) {
      console.error(err);
      console.dir("err path")
      setShowAlert(true);

      event.preventDefault();
      event.stopPropagation();

    }

    // setUserFormData({
    //   email: "",
    //   password: "",
    // });

    // try {
    //   const response = await loginUser(userFormData);

    //   if (!response.ok) {
    //     throw new Error("something went wrong!");
    //   }

    //   const { token, user } = await response.json();
    //   console.log(user);
    //   // Auth.login(token);
    // } catch (err) {
    //   console.error(err);
    //   // setShowAlert(true);
    // }

    // setUserFormData({
    //   username: "",
    //   email: "",
    //   password: "",
    // });
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   // setUserFormData({ ...userFormData, [name]: value });
  //   if (name == "email") {
  //     setUserFormData({ ...userFormData, [name]: value });
  //   } else if (name == "password") {
  //     setUserFormData({ ...userFormData, [name]: value });
  //   }
  // };

  return (
    <>
      <Form
        noValidate validated={validated}
        onSubmit={handleFormSubmit}
      >
        {error && (
        <Alert
          // dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials! -- {error.message}
        </Alert>
        )}
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email"
            name="email"
            onChange={handleChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Valid Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"

            onChange={handleChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
          Valid Password is required! Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
