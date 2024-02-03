import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";

import Spinner from "react-bootstrap/Spinner";

import useGetData from "../custom-hooks/useGetData";

import ProductItem from "./ProductItem";

import * as request from "../Utils/request";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { reloadProduct } from "../redux/slices/loadProduct";
import MyPagination from "../components/UI/MyPagination";

import { useNavigate } from "react-router-dom";
const AllProducts = () => {

    const navigate = useNavigate();

   const products = useGetData();
   const dispatch = useDispatch();

 

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const config = {
    // withCredentials: true,
    "Content-Type": "application/auto",
    // Authorization: "Basic " + localStorage.getItem("cookie"),
    // 'Access-Control-Allow-Origin': false ,
  };

  const reload = () => {
    dispatch(reloadProduct.reloadProduct(true));
  };

  const handleDelete = (id: any) => {
    setLoading(true);
    const path = "products/" + id;
    try {
      request
        .delete1(path, { headers: config })
        .then((res) => {
          reload();
          toast.success("delete successfully");
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (id: any) => {
    navigate(`/dashboard/edit-product/${id}`)
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    console.log(page);
  };


  // console.log(products.products);
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h5 className="d-flex align-items-center justify-content-center  gap-2">
                <Spinner animation="border" variant="info" />
                <span>Loading...</span>
              </h5>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.products.map((item, index) => (
                    <ProductItem
                      key={index}
                      id={item.id}
                      imgUrl={item.file?.url}
                      imageUrl={item.file?.url}
                      priceSales={item.priceSales}
                      productName={item.productName}
                      category={item.category}
                      price={item.price}
                      delete={() => handleDelete(item.id)}
                      edit={() => handleEdit(item.id)}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </Col>

          <MyPagination
            currentPage={page}
            totalPages={Number(products.totalPagesProduct)}
            onPageChange={handlePageChange}
                    
          />
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
