import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import { Loader } from "../components/Loading.js";
import { Msg } from "./../components/Msg";
import {
  orderDetailsAction,
  orderPayAction,
  orderDeliveredAction,
} from "../actions/orderActions.js";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVERED_RESET,
} from "../constants/orderTypes.js";

const OrderUI = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigateTo = useNavigate();
  const orderId = params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, isLoading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { isLoading: isLoadingPay, success: successPay } = orderPay;

  const orderDelivered = useSelector((state) => state.orderDelivered);
  const { isLoading: isLoadingDeliver, success: successDeliver } =
    orderDelivered;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  if (!isLoading) {
    //   Calculation
    const decimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = decimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigateTo("/login");
    }
    const payPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERED_RESET });
      dispatch(orderDetailsAction(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        payPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, successPay, successDeliver, order, orderId]);

  const successfulPayHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(orderPayAction(orderId, paymentResult));
  };

  const deliveredHandler = () => {
    dispatch(orderDeliveredAction(order));
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Msg varient="danger">{error}</Msg>
  ) : (
    <React.Fragment>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Msg variant="success">Delivered on {order.deliveredAt}</Msg>
              ) : (
                <Msg variant="danger">Not Delivered</Msg>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Msg variant="success">Paid {order.paidAt}</Msg>
              ) : (
                <Msg variant="danger">Not Paid</Msg>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Msg>Order is empty</Msg>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {isLoadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successfulPayHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {isLoadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliveredHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OrderUI;
