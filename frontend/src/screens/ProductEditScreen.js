import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productAction";
import { PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_RESET } from "../constants/productConstants";


const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState(0);
  const [uploading, setUploading] = useState(false);



  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;


  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setMainCategory(product.category.mainCategory);
        setSubCategory(product.category.subCategory);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [product, dispatch, productId, history, successUpdate]);

  const uploadFileHandler =  async(e) =>{
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      mainCategory,
      subCategory,
      description,
      countInStock
    }))
  }

  return (
    <div>
    <Link to="/admin/productlist" className="btn btn-light my-3">Go Back</Link>

    <FormContainer>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label className="form-label mt-2">Name:</Form.Label>
          <Form.Control 
            type="name" 
            placeholder="Enter name" 
            value ={name} 
            onChange={(e) => setName(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label className="form-label mt-2">Price:</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Enter price" 
            value ={price} 
            onChange={(e) => setPrice(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="image">
        <Form.Label className="form-label mt-2">Image:</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Enter image url" 
            value ={image} 
            onChange={(e) => setImage(e.target.value)}>
          </Form.Control>
          <input className="form-control" type="file" id="image-file" onChange={uploadFileHandler}></input>
          {uploading && <Loader />}
        </Form.Group>
        <Form.Group controlId="brand">
        <Form.Label className="form-label mt-2">Brand:</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter brand" 
            value ={brand} 
            onChange={(e) => setBrand(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="countInStock">
          <Form.Label className="form-label mt-2">Count In Stock:</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Enter countInStock" 
            value ={countInStock} 
            onChange={(e) => setCountInStock(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="main-category">
        <Form.Label className="form-label mt-2">Category(Main):</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter main category" 
            value ={mainCategory} 
            onChange={(e) => setMainCategory(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="sub-category">
        <Form.Label className="form-label mt-2">Category(Sub):</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter sub category" 
            value ={subCategory} 
            onChange={(e) => setSubCategory(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
        <Form.Label className="form-label mt-2">Description:</Form.Label>
          <Form.Control 
            as="textarea"
            type="text" 
            placeholder="Enter description" 
            value ={description} 
            onChange={(e) => setDescription(e.target.value)}
            rows={3}>
          </Form.Control>
        </Form.Group>
        <br></br>
        <Button type="submit" variant="primary">Update</Button>
      </Form>
      )}
    </FormContainer>
    </div>
  )
}

export default ProductEditScreen;