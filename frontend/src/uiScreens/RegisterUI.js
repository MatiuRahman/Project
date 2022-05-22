import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Msg } from "../components/Msg";
import { Loader } from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { registerAction } from "../actions/userActions";

const registerUI = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [msg, setMsg] = useState(null);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { isLoading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigateTo(redirect);
    }
  }, [navigateTo, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passConfirm) {
      setMsg("Password doesn't match");
    } else {
      dispatch(registerAction(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {msg && <Msg variant="danger">{msg}</Msg>}
      {error && <Msg variant="danger">{error}</Msg>}
      {isLoading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="passConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="PassConfirm"
            placeholder="Confirm password"
            value={passConfirm}
            onChange={(e) => setPassConfirm(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCheckbox">
          <Form.Check type="checkbox" label="Remember Me" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already Have Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default registerUI;
