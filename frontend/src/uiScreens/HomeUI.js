import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MetaSection from "../components/MetaSection";
import Product from "../components/Product";
import { itemsListAction } from "../actions/itemsActions";
import { Loader } from "../components/Loading";
import { Msg } from "../components/Msg";
import { useParams } from "react-router-dom";
import Paginate from "./../components/Paginate";
import ItemsCarousel from "../components/ItemsCarousel.js";

const HomeUI = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const pageNumber = params.pageNumber || 1;
  const keyword = params.keyword;

  const productList = useSelector((state) => state.productList);
  const { isLoading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(itemsListAction(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]); //dispatch for warning down the console.

  return (
    <React.Fragment>
      <MetaSection />
      {!keyword ? (
        <ItemsCarousel />
      ) : (
        <Link to="/" className="btn btn-dark">
          {" "}
          Back{" "}
        </Link>
      )}
      <h1>Latest Products</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Msg varient="danger">{error}</Msg>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={16} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default HomeUI;
