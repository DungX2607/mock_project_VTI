import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import OrderProps from "./OrderProps";
import { useOrderData } from "../custom-hooks/useOrderData";

import * as request from "../Utils/request";

// type productDetail = {
//   id: any;
//   productName: string;
//   price: any;
//   priceSales: any;
// };
// type orderDetail = {
//   orderDetailsId: any;
//   productQuantity: any;
//   product: productDetail;
// };

// type order = {
//   orderId: any;
//   status: string;
//   orderDate: string;
//   totalPrice: any;
//   orderDetails: orderDetail[];
// };

// type propsItem = {
//   customersId: any;
//   fullName: string;
//   email: string;
//   phone: string;
//   address: string;
//   orders: order[];
// };

const Order = () => {
  const { getOrder, setGetOrder } = useOrderData();
  // const [getOrder, setGetOrder] = useState<Array<propsItem>>([]);

  const config = {
    withCredentials: true,
    "Content-Type": "application/json",
    // Authorization: "Basic " + localStorage.getItem("cookie"),
    // 'Access-Control-Allow-Origin': false ,
  };

  const getAllOrder = async () => {
    try {
      await request
        .get("customer/all-customer", { headers: config })
        .then((res) => {
          setGetOrder(res.content);
          console.log(getOrder);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrder();
  }, []);
  return (
    <section>
      <Container>
        <Row>
          <Col>
            <Table responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {getOrder.map((item, index) => 
                  <OrderProps
                  key={index}
                  customersId={item.customersId}
                  fullName={item.fullName}
                  address={item.address}
                 
                  phone={item.phone}
                  orders={item.orders}
                
                  />
                )}

              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Order;
