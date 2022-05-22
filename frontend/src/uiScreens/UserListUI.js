import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Msg } from "../components/Msg";
import { Loader } from "../components/Loading";
import { listUsersAction, userDeleteAction } from "../actions/userActions";

const UserListUI = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { isLoading, error, users } = userList;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: deleteSuccess } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsersAction());
    } else {
      navigateTo("/login");
    }
  }, [dispatch, navigateTo, deleteSuccess, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure.")) {
      dispatch(userDeleteAction(id));
    }
  };

  return (
    <React.Fragment>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Msg variant="danger">{error}</Msg>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default UserListUI;
