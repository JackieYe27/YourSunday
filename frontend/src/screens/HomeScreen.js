import React, { useState, useEffect, useRef } from "react";
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

import { listProducts, listCategoryProducts } from "../actions/productAction";
import Hero from "../components/Hero";



const HomeScreen = ({ match }) => {
  const scrollTarget = useRef(null);
  const scrollTo = scrollTarget.current;
  
  const keyword = match.params.keyword;
  // const [products, setProducts] = useState([]);

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  
  const productList = useSelector((state) => {
    return state.productList;
  });
  const { loading, error, products, page, pages } = productList;

  const productCategory = useSelector((state) => {
    return state.productCategory;
  });

  const {categoryProducts} = productCategory;
  
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
    return product.category.mainCategory;
  }))]

  const [showAll, setShowAll] = useState(true);

  const filterItems = (category) => {
    if(category === "All") {
      setShowAll(true);
    } else {
      dispatch(listCategoryProducts(category));
      setShowAll(false);
    }
  }

  useEffect(() => {
    // fetchData();
    dispatch(listProducts(keyword, pageNumber));
  },[dispatch, keyword, pageNumber]);

  return (
    <div>
      <Meta />
      {!keyword && <Hero products={products} scrollTo={scrollTo}/>}
      {!keyword ? <ProductCarousel /> : <Link to="/" className="btn btn-light">Go Back</Link>}
      {!keyword && <Categories categories={allCategories} filterItems={filterItems} />}
      <h1 ref={scrollTarget} id="scroll">Sunday Products</h1>
      {loading ? <Loader /> : error ? <Message variant="danger" >{error}</Message> : 
      <div>
        <Row>
        { categoryProducts && !showAll ? categoryProducts.map(product => {
            return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
            )
          }) :
          products.map(product => {
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