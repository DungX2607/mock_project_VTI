import React from "react";
import { Col, Container, Row } from "reactstrap";

import Spinner from "react-bootstrap/Spinner";

import "../styles/Dashboard.scss";
import useGetData from "../custom-hooks/useGetData";
import { priceFormat } from "../model/FormatVND";

const Dashboard = () => {
  const {
    useData,
    products,
    getOrder,
    totalElementsAccount,
    totalElementsProduct,
  } = useGetData();

  const totalSales = getOrder
  .flatMap((customer) => customer.orders) // Biến đổi mảng các khách hàng thành một mảng của tất cả đơn hàng
  // .filter((order) => order.status === 'completed')
  .reduce((total, order) => total + order.totalPrice, 0)

  // Tổng số Orders có thể đơn giản là số lượng đơn hàng
  const totalOrders = getOrder.length;

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col className="lg-3">
              <div className="revenue__box">
                <h5>Total Sales</h5>
                <span>${(priceFormat(totalSales))}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="order__box">
                <h5>Orders</h5>
                <span>{totalOrders}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="product__box">
                <h5>Total Products</h5>
                {totalElementsProduct ? (
                  <span>{totalElementsProduct}</span>
                ) : (
                  <Spinner animation="border" variant="info" />
                )}
              </div>
            </Col>
            <Col className="lg-3">
              <div className="user__box">
                <h5>Total Users</h5>
                {totalElementsAccount ? (
                  <span>{totalElementsAccount}</span>
                ) : (
                  <Spinner animation="border" variant="info" />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
