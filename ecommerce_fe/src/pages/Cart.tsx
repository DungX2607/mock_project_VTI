import React, { useState } from "react";
import "../styles/Cart.scss";
import Helmet from "../components/helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { TReducers } from "../redux/rootReducer";
import { priceFormat } from "../model/FormatVND";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../redux/slices/cartSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { GrSubtract } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";

import Spinner from "react-bootstrap/Spinner";

import * as request from "../Utils/request";

type itemCart = {
  id: any;
  imgUrl: any;
  price: number;
  priceSales: number;
  quantity: number;
  productName: any;
  file: { url: string } | any;
  detail: (id: any) => void;
  delete: (id: any) => void;
};

const PropsCart = (props: itemCart) => {
  const dispatch = useDispatch();
  // Hàm để tăng số lượng sản phẩm
  const increment = () => {
    // Cập nhật số lượng sản phẩm trong Redux store
    dispatch(
      // cartActions.updateQuantity({ id: props.id, quantity: props.quantity + 1 })
      cartActions.addItem({
        id: props.id,
        productName: props.productName,
        price: props.price,
        priceSales: props.priceSales,
        imgUrl: props.imgUrl,
      })
    );
  };

  // Hàm để giảm số lượng sản phẩm
  const decrement = () => {
    if (props.quantity > 1) {
      dispatch(cartActions.decreaseQuantity(props.id));
    }
  };

  return (
    <tr>
      <td className="cart__img">
        <img src={props.imgUrl} alt="product" />
      </td>
      <td
        className="product__title"
        onClick={() => {
          props.detail(props.id);
        }}
      >
        {props.productName}
      </td>
      <td>{priceFormat(props.price)}</td>

      <td>
        <div className="quantity__wrapper">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="quantity__btn"
            onClick={decrement}
          >
            <GrSubtract />
          </motion.button>
          <span className="quantity__number">{props.quantity}</span>
          <motion.button
            whileTap={{ scale: 1.1 }}
            className="quantity__btn"
            onClick={increment}
          >
            <FaPlus />
          </motion.button>
        </div>
      </td>

      <td>
        <motion.i
          whileHover={{ scale: 1.2, color: "#FF0033" }}
          onClick={() => props.delete(props.id)}
          className="ri-delete-bin-line fs-5"
        ></motion.i>
      </td>
    </tr>
  );
};

type PaymentMethod = "vnPay" | "cash";

// interface BillingFormProps {
//   paymentMethod: PaymentMethod;
//   setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
//   name: string;
//   setName: React.Dispatch<React.SetStateAction<string>>;
//   email: string;
//   setEmail: React.Dispatch<React.SetStateAction<string>>;
//   phoneNumber: string;
//   setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;

//   onSubmit: (formData: any) => void;
// }

// const BillingForm: React.FC<BillingFormProps> = ({
//   paymentMethod,
//   setPaymentMethod,
//   name,
//   setName,
//   email,
//   setEmail,
//   phoneNumber,
//   setPhoneNumber,
//   onSubmit,
// }) => {
//   const handlePaymentMethodChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setPaymentMethod(e.target.value as PaymentMethod);
//   };

//   const handleSubmit = (values: {
//     name: string;
//     email: string;
//     phoneNumber: string;
//   }) => {
//     setName(values.name);
//     setEmail(values.email);
//     setPhoneNumber(values.phoneNumber);
//     const formData = {
//       name: values.name,
//       email: values.email,
//       phoneNumber: values.phoneNumber,
//       paymentMethod,
//     };

//     onSubmit(formData);
//   };

//   return (
//     <div className="billing__form">
//       <legend>Billing Information</legend>
//       <Form className="billing__form">
//         <FormGroup className="form__group">
//           <Input type="text" placeholder="Enter your name" />
//         </FormGroup>

//         <FormGroup className="form__group">
//           <Input type="email" placeholder="Enter your email" />
//         </FormGroup>

//         <FormGroup className="form__group">
//           <Input type="number" placeholder="Phone number" />
//         </FormGroup>

//         <FormGroup className="form__group">
//           <Input type="text" placeholder="Street address" />
//         </FormGroup>

//         <FormGroup tag="fieldset">
//           <legend>Phương thức thanh toán</legend>
//           <FormGroup check>
//             <Input
//               type="radio"
//               name="paymentMethod"
//               value="vnpay"
//               checked={paymentMethod === "vnpay"}
//               onChange={handlePaymentMethodChange}
//             />
//             <Label check>Thanh toán qua VNPAY</Label>
//           </FormGroup>
//           <FormGroup check>
//             <Input
//               type="radio"
//               name="paymentMethod"
//               value="cash"
//               checked={paymentMethod === "cash"}
//               onChange={handlePaymentMethodChange}
//               defaultChecked
//             />
//             <Label check>Thanh toán khi nhận hàng</Label>
//           </FormGroup>
//         </FormGroup>
//       </Form>
//     </div>
//   );
// };

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  const cartItems: any = useSelector<TReducers>(
    (state) => state.cart.cartItems
  );

  const totalAmount: any = useSelector<TReducers>(
    (state) => state.cart.totalAmount
  );

  const totalQuantity: any = useSelector<TReducers>(
    (state) => state.cart.totalQuantity
  );

  const totalSale: any = useSelector<TReducers>(
    (state) => state.cart.totalSalesPrice
  );

  const total: any = useSelector<TReducers>((state) => state.cart.totalFinal);

  const productDetail = (id: any) => {
    navigate(`/shop/${id}`);
  };

  const handleDelete = (id: any) => {
    dispatch(cartActions.deleteItem(id));
  };

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const changePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };
  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const changeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value as PaymentMethod);
  };

  const config = {
    // withCredentials: true,
    "Content-Type": "application/json",
    // Authorization: "Basic " + localStorage.getItem("cookie"),
    // 'Access-Control-Allow-Origin': false ,
  };

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (totalQuantity) {
      const dataOrder: { [key: string]: any } = {
        fullName: name,
        email: email,
        phone: phoneNumber,
        address: address,
        city: "",
      };

      const orderDetail: { [key: string]: any } = {
        status: "PENDING",
        orderDate: "",
        totalPrice: total,
        paymentMethod: paymentMethod,
      };

      type productOrderDetail = {
        productQuantity: any;
        productId: any;
      };

      const orderProduct: productOrderDetail[] = [];

      cartItems.map((item: any) => {
        const itemP: productOrderDetail = {
          productId: item.id,
          productQuantity: item.quantity,
        };
        orderProduct.push(itemP);
      });

      orderDetail.orderDetailForms = orderProduct;

      dataOrder.orderForm = orderDetail;
      setLoading(true);
      try {
        request
          .post1("customer/new-order", { headers: config }, dataOrder)
          .then((res) => {
            toast.success("Đặt hàng thành công!");
            sessionStorage.clear();
            
            dispatch((cartActions.deleteAllItems()));

            navigate("/shop");
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      toast.warning("Không có sản phẩm trong giỏ hàng");
    }
  };

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {loading ? (
                <h5 className="d-flex align-items-center justify-content-center  gap-2">
                  <Spinner animation="border" variant="info" />
                  <span>Loading...</span>
                </h5>
              ) : cartItems.length === 0 ? (
                <h2 className="fs-4 text-center"> No Items Added the cart</h2>
              ) : (
                <table className="table boder">
                  <thead>
                    <tr>
                      <th className="cart__img">Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item: any, index: number) => {
                      return (
                        <PropsCart
                          key={index}
                          id={item.id}
                          imgUrl={item.imgUrl}
                          price={item.price}
                          priceSales={item.priceSales}
                          productName={item.productName}
                          quantity={item.quantity}
                          file={item.file}
                          detail={() => productDetail(item.id)}
                          delete={() => handleDelete(item.id)}
                        />
                      );
                    })}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3" className="info__payment">
              <div>
                <h6 className="d-flex align-items-center justify-content-between ">
                  Subtotal
                  <span className="fs-5 fw-bold">
                    {priceFormat(totalAmount)}
                  </span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between ">
                  Discount
                  <span className="fs-5 fw-bold">{priceFormat(totalSale)}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between ">
                  Total
                  <span className="fs-4 fw-bold">{priceFormat(total)}</span>
                </h6>
              </div>
              {/* 
              <BillingForm
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                address={address}
                setAddress={setAddress}
                onSubmit={handleFormSubmit}
              /> */}

              <div className="billing__form">
                <legend>Billing Information</legend>
                <Form className="billing__form" onSubmit={handleFormSubmit}>
                  <FormGroup className="form__group">
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={changeName}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={changeEmail}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <Input
                      type="number"
                      placeholder="Phone number"
                      value={phoneNumber}
                      onChange={changePhoneNumber}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <Input
                      type="text"
                      placeholder="Street address"
                      value={address}
                      onChange={changeAddress}
                      required
                    />
                  </FormGroup>

                  <FormGroup tag="fieldset" >
                    <legend>Phương thức thanh toán</legend>
                    <FormGroup check>
                      <Input
                        type="radio"
                        name="paymentMethod"
                        value={"vnPay"}

                        checked={paymentMethod === "vnPay"}
                        onChange={handlePaymentMethodChange}
                        disabled
                        
                      />
                      <Label check>Thanh toán qua VNPAY</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        name="paymentMethod"
                        value={"cash"}
                        // defaultChecked
                        checked={paymentMethod === "cash"}
                        onChange={handlePaymentMethodChange}
                      />
                      <Label check>Thanh toán khi nhận hàng</Label>
                    </FormGroup>
                  </FormGroup>

                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    className="buy__btn w-100"
                    type="submit"
                  >
                    Confirm Payment
                  </motion.button>
                </Form>
              </div>

              <div>
                <motion.button
                  whileTap={{ scale: 1.1 }}
                  className="buy__btn w-100"
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cart;
