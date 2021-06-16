import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/products");
      const newProducts = await response.json();
      setProducts(newProducts);
    } catch (error) {
      console.log("There has been an error with fetching data!");
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {
          products.map(product => {
            return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
            )
          })
        }
      </Row>
    </div>
  )
}

export default HomeScreen