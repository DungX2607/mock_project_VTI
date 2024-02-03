import React from "react";
import Helmet from "../components/helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Form, FormGroup, Input, Row } from "reactstrap";
import "../styles/Checkout.scss";
import { useSelector } from "react-redux";
import { TReducers } from "../redux/rootReducer";
import { priceFormat } from "../model/FormatVND";
const Checkout = () => {
  const totalAmount: any = useSelector<TReducers>(
    (state) => state.cart.totalFinal
  );
  const totalQty: any = useSelector<TReducers>(
    (state) => state.cart.totalQuantity
  );

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <Input type="text" placeholder="Enter your name" />
                </FormGroup>

                <FormGroup className="form__group">
                  <Input type="email" placeholder="Enter your email" />
                </FormGroup>

                <FormGroup className="form__group">
                  <Input type="number" placeholder="Phone number" />
                </FormGroup>

                <FormGroup className="form__group">
                  <Input type="text" placeholder="Street address" />
                </FormGroup>

                <FormGroup className="form__group">
                  <Input type="text" placeholder="City" />
                </FormGroup>

                <FormGroup className="form__group">
                  <Input type="text" placeholder="Postal Code" />
                </FormGroup>

                <FormGroup className="form__group">
                  <Input type="text" placeholder="Country" />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty: <span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal: <span>{priceFormat(totalAmount)}</span>
                </h6>
                <h6>
                  <span>
                    Shipping: <br /> free shipping
                  </span>
                  <span>{priceFormat(0)}</span>
                </h6>

                <h5>
                  Total Cost: <span>{priceFormat(totalAmount)}</span>
                </h5>
                <button className="buy__btn auth__btn w-100">
                  Place an oder
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
