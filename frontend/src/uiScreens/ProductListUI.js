import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Msg } from "../components/Msg";
import { Loader } from "../components/Loading.js";
import {
  itemsDeleteAction,
  itemsListAction,
  itemsCreateAction,
} from "../actions/itemsActions.js";
import { ITEM_CREATE_RESET } from "../constants/itemsTypes.js";
import Paginate from "./../components/Paginate";

const ProductListUI = () => {
  const params = useParams();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { isLoading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    isLoading: isLoadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    isLoading: isLoadingCreate,
    error: errorCreate,
    success: successCreate,
    product: productCreated,
  } = productCreate;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  useEffect(() => {
    dispatch({ type: ITEM_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigateTo("/login");
    }

    if (successCreate) {
      navigateTo(`/admin/product/${productCreated._id}/edit`);
    } else {
      dispatch(itemsListAction("", pageNumber)); //adding empty string would not include the keyword
    }
  }, [userInfo, successCreate, successDelete, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm(" Sure? ")) {
      dispatch(itemsDeleteAction(id));
    }
  };
  const createProductHandler = () => {
    dispatch(itemsCreateAction());
  };

  return (
    <React.Fragment>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {isLoadingDelete && <Loader />}
      {errorDelete && <Msg variant="danger">{errorDelete}</Msg>}
      {isLoadingCreate && <Loader />}
      {errorCreate && <Msg variant="danger">{errorCreate}</Msg>}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Msg variant="danger">{error}</Msg>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductListUI;
