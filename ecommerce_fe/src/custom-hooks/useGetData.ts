import React, { useEffect, useState } from "react";
import { userPops } from "../model/user";
import * as request from "../Utils/request";
import { ProductProps } from "../model/productProps";

import { useDispatch, useSelector } from "react-redux";
import { TReducers } from "../redux/rootReducer";
import { reloadProduct } from "../redux/slices/loadProduct";
import { useOrderData } from "./useOrderData";


const useGetData = () => {
  const [useData, setUseData] = useState<Array<userPops>>([]);

  const [products, setProducts] = useState<Array<ProductProps>>([]);
  const [totalPagesProduct, setTotalPagesProduct] = useState("");
  const [totalElementsProduct, setTotalElementsProduct] = useState("");
  const [totalPagesAccount, setTotalPagesAccount] = useState("");
  const [totalElementsAccount, setTotalElementsAccount] = useState("");
  const [totalSales, setTotalSales] = useState("");
  const [totalOrders, setTotalOrders] = useState("");

  const { getOrder, getAllOrder } = useOrderData();

  const reload = useSelector((state: TReducers) => state.reload.load);
  const dispatch = useDispatch();

  const notReload = () => {
    dispatch(reloadProduct.reloadProduct(false));
  };

  const config = {
    withCredentials: true,
    "Content-Type": "application/json",
    // Authorization: "Basic " + localStorage.getItem("cookie"),
    // 'Access-Control-Allow-Origin': false ,
  };

  

  const getAllAccount = async () => {
    await request
      .get("accounts", {
        headers: config,
      })
      .then((res) => {
        setUseData(res.content);
        setTotalPagesAccount(res.totalPages);
        setTotalElementsAccount(res.totalElements);
        notReload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllProducts = async (page?: number) => {
    await request
      .get(`products?page=${page}`, { headers: config })
      .then((res) => {
        setProducts(res.content);
        setTotalPagesProduct(res.totalPages);
        setTotalElementsProduct(res.totalElements);
        notReload();
      })
      .catch((err) => {
        console.log(err.status);
      });
  };

  useEffect(() => {
    getAllAccount();
    getAllProducts();
    getAllOrder();
  }, []);

  useEffect(() => {
    getAllAccount();
    getAllProducts();
    getAllOrder();
  }, [reload]);

  return {
    useData,
    products,
    getOrder,
    totalElementsAccount,
    totalElementsProduct,
    totalPagesAccount,
    totalPagesProduct,
  };
};

export default useGetData;
