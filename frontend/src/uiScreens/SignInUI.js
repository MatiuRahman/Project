import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Msg } from "../components/Msg";
import { Loader } from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { signInAction } from "../actions/userActions.js";

const SignInUI = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userSignIn = useSelector((state) => state.userSignIn);
  const { isLoading, error, userInfo } = userSignIn;

  useEffect(() => {
    if (userInfo) {
      navigateTo(redirect);
    }
  }, [navigateTo, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signInAction(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Msg variant="danger">{error}</Msg>}
      {isLoading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCheckbox">
          <Form.Check type="checkbox" label="Remember Me" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Client?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default SignInUI;
