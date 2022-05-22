import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Msg } from "../components/Msg.js";
import { Loader } from "../components/Loading.js";
import FormContainer from "./../components/FormContainer.js";
import {
  userDetailsAction,
  adminUpdateUserAction,
} from "../actions/userActions.js";
import { ADMIN_UPDATE_USER_RESET } from "../constants/userConstants.js";

const UserEditUI = () => {
  const params = useParams();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const userId = params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { isLoading, error, user } = userDetails;

  const adminUpdateUser = useSelector((state) => state.adminUpdateUser);
  const {
    isLoading: isLoadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adminUpdateUser;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADMIN_UPDATE_USER_RESET });
      navigateTo("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(userDetailsAction(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [userId, user, navigateTo, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminUpdateUserAction({ _id: userId, name, email, isAdmin }));
  };

  return (
    <React.Fragment>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        {" "}
        Go Back{" "}
      </Link>
      <FormContainer>
        <h1> Edit User </h1>
        {isLoadingUpdate && <Loader />}
        {errorUpdate && <Msg variant="danger">{errorUpdate}</Msg>}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Msg variant="danger">{error}</Msg>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default UserEditUI;
