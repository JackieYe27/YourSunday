import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productAction";

const HomeScreen = ({ match }) => {

  const keyword = match.params.keyword;
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  
  const productList = useSelector((state) => {
    return state.productList;
  });

  const { loading, error, products } = productList;

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("/api/products");
  //     const newProducts = await response.json();
  //     setProducts(newProducts);
  //   } catch (error) {
  //     console.log("There has been an error with fetching data!");
  //   }
  // }

  useEffect(() => {
    // fetchData();
    dispatch(listProducts(keyword));
  },[dispatch, keyword]);


  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? <Loader /> : error ? <Message variant="danger" >{error}</Message> : 
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
      }
    </div>
  )
}

export default HomeScreen