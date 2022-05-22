import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { Loader } from "./Loading";
import { Msg } from "./Msg";
import { itemsTopAction } from "../actions/itemsActions";
import { useDispatch, useSelector } from "react-redux";

const ItemsCarousel = () => {
  const dispatch = useDispatch();

  const topProducts = useSelector((state) => state.topProducts);
  const { isLoading, error, products } = topProducts;

  useEffect(() => {
    dispatch(itemsTopAction());
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Msg variant="danger">{error}</Msg>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ItemsCarousel;
