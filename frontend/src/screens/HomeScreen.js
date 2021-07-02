import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import ProductCarousel from "../components/ProductCarousel";
import Categories from "../components/Categories";

import { listProducts } from "../actions/productAction";



const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  // const [products, setProducts] = useState([]);

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  
  const productList = useSelector((state) => {
    return state.productList;
  });
  const { loading, error, products, page, pages } = productList;

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("/api/products");
  //     const newProducts = await response.json();
  //     setProducts(newProducts);
  //   } catch (error) {
  //     console.log("There has been an error with fetching data!");
  //   }
  // }

  const allCategories = ["All", ...new Set(products.map(product => {
    return product.category
  }))]

  const [showProducts, setShowProducts] = useState(products);

  const filterItems = (category) => {
    if(category === "All") {
      setShowProducts(products);
    } else {
      const newProducts = products.filter(product => {
        return product.category.toLowerCase() === category.toLowerCase();
      })
      setShowProducts(newProducts);
    }
  }

  useEffect(() => {
    // fetchData();
    dispatch(listProducts(keyword, pageNumber));
    setShowProducts(products);
  },[dispatch, keyword, pageNumber]);

  return (
    <div>
      <Meta />
      {!keyword ? <ProductCarousel /> : <Link to="/" className="btn btn-light">Go Back</Link>}
      <Categories categories={allCategories} filterItems={filterItems}/>
      <h1 onClick={() => setShowProducts(products)}>Sunday Products</h1>
      {loading ? <Loader /> : error ? <Message variant="danger" >{error}</Message> : 
      <div>
        <Row>
        {
          showProducts.map(product => {
            return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
            )
          })
        }
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""}/>
      </div>
      }
    </div>
  )
}

export default HomeScreen