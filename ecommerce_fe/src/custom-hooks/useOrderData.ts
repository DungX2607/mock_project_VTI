
import { useEffect, useState } from "react";
import * as request from "../Utils/request";

type productDetail = {
    id: any;
    productName: string;
    price: any;
    priceSales: any;
  };
  type orderDetail = {
    orderDetailsId: any;
    productQuantity: any;
    product: productDetail;
  };
  
  type order = {
    orderId: any;
    status: string;
    orderDate: string;
    totalPrice: any;
    orderDetails: orderDetail[];
  };
  
  type propsItem = {
    customersId: any;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    orders: order[];
  };

export const useOrderData = () => {
  const [getOrder, setGetOrder] = useState<Array<propsItem>>([]);
  
  // Khai báo config ở đây hoặc trong file request.tsx để tái sử dụng
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

  return {
    getOrder,
    setGetOrder,
    getAllOrder
  };
};
