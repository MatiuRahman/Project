import React, { useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { Msg } from "../components/Msg";
import { addToCartAction, removeFromCartAction } from "../actions/cartActions";

const CartUI = () => {
  const { id } = useParams();
  const productId = id;
  // console.log("ID :", productId);
  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("qty");
  // console.log("QTY", qtyInUrl);
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeItemHandler = (id) => {
    dispatch(removeFromCartAction(id));
  };
  const checkOutHandler = (id) => {
    navigate("/login?redirect=/shipping");
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCartAction(productId));
    }
  }, [dispatch, productId]);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Msg>
            {" "}
            Your cart is Empty. <Link to="/">Go Back</Link>{" "}
          </Msg>
        ) : (
          <ListGroup varient="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(event) =>
                        dispatch(
                          addToCartAction(
                            item.product,
                            Number(event.target.value)
                          )
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      varient="light"
                      onClick={() => removeItemHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup varient="light"></ListGroup>
          <ListGroupItem>
            <h2>
              {" "}
              Total {cartItems.reduce((a, item) => a + item.qty, 0)} Items
            </h2>
            ${cartItems.reduce((a, item) => a + item.qty * item.price, 0)}
          </ListGroupItem>
          <ListGroupItem>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkOutHandler}
            >
              Checkout
            </Button>
          </ListGroupItem>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartUI;
