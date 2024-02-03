import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Helmet from "../components/helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Row, Table } from "reactstrap";

import { priceFormat } from "../model/FormatVND";
import { motion } from "framer-motion";
import "../styles/ProductDetails.scss";
import ProductsList from "../components/UI/ProductsList";

import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import useGetData from "../custom-hooks/useGetData";

import { ProductProps } from "../model/productProps";
import * as request from "../Utils/request";

const ProductDetails = () => {
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(0);
  const [load, setload] = useState(false);

  const { id } = useParams();

  const [product, setProduct] = useState<ProductProps>({
    id: "",
    productName: "",
    imgUrl: "",
    price: 0,
    priceSales: 0,

    description: "",
    avgRating: 0,
    shortDesc: "",
    reviews: [
      {
        reviewId: 0,
        username: "",
        rating: 0,
        reviewText: "",
      },
    ],
    category: "",
    file: {
      id: "",
      fileType: "",
      url: "",
      fileName: "",
    },
    origin: {
      id: "",
      manufacturer: "",
      madeIn: "",
      guarantee: "",
    },

    information: {
      id: "",
      wattage: "",
      noise: "",
      technology: "",
      level: "",
      mode: "",
      accessory: "",
      size: "",
      weight: "",
      color: "",
      otherFunction: "",
    },
  });

  const config = {
    //  withCredentials: true,
    "Content-Type": "application/json",
    // Authorization: "Basic " + localStorage.getItem("cookie"),
    // 'Access-Control-Allow-Origin': false ,
  };

  const getProductById = async () => {
    try {
      await request
        .get(`products/${Number(id)}`, { headers: config })
        .then((res) => {
          setProduct(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //  const product= products1.find((item)=> item.id === Number(id));
  // const product = products.find((item) => item.id === id);

  const dispatch = useDispatch();

  const reviewMessage = useRef<HTMLTextAreaElement | null>(null);
  const reviewUser = useRef<HTMLInputElement | null>(null);

  const {
    productName,
    imgUrl,
    price,
    priceSales,
    description,
    avgRating,
    shortDesc,
    reviews,
    category,
    file,
    origin,
    information,
  }: any = product;

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        imgUrl: file.url,
        productName,
        price,
        priceSales,
        file,
      })
    );

    toast.success("Product added successfully!");
  };

  const relatedProducts = useGetData().products.filter(
    (item) => item.category === category
  );

  const submitReview = async (data: any) => {
    try {
      await request
        .post1<ResponseType>("reviews/new-review", { headers: config }, data)
        .then((res) => {
          console.log(res);
        })
        .then((response) => {
          console.log(response);
          setload(true);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const submit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reviewObj = JSON.stringify({
      username: reviewUser.current?.value,
      rating: rating,
      reviewText: reviewMessage.current?.value,
      productId: Number(id),
    });

    submitReview(reviewObj);
    console.log(reviewObj);
    // toast.error("Review submitted fail");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    getProductById();
    setload(false);
  }, [id, load]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6" className="mt-4">
              <img src={file.url} alt="" className="detail__img" />
            </Col>

            <Col lg="6">
              <div className="product_details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-item-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-fill"></i>
                    </span>
                  </div>
                  <p>{<span>{avgRating}</span>} Ratings</p>
                </div>

                <div className="d-flex align-items-center gap-4">
                  <span className="product__price">
                    {priceFormat(price - price * (priceSales / 100))}
                  </span>
                  <span className="product__price-sales">
                    {priceFormat(price)}
                  </span>

                  <span>Category: {category.toUpperCase()}</span>
                </div>

                <p className="mt-3">{shortDesc}</p>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tap__wrapper d-flex align-item-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => {
                    setTab("desc");
                  }}
                >
                  Mô tả
                </h6>
                <h6
                  className={`${tab === "info" ? "active__tab" : ""}`}
                  onClick={() => {
                    setTab("info");
                  }}
                >
                  Thông số Kỹ thuật
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => {
                    setTab("rev");
                  }}
                >
                  Review ({reviews.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : tab === "rev" ? (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {reviews.map((item: any, index: number) => {
                        console.log(item.rating);
                        return (
                          <li key={index} className="mb-4">
                            <div className="d-flex flex-start gap-3 align-items-center">
                              <h6 className="mb-0">{item.username}</h6>
                              <span>
                                {item.rating} (
                                <i className="ri-star-s-fill"></i>)
                              </span>
                            </div>

                            <p>{item.reviewText}</p>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={submit}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter name"
                            ref={reviewUser}
                            required
                          />
                        </div>

                        <div className="form__group rating__group d-flex align-items-center gap-5 ">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => {
                              setRating(1);
                            }}
                          >
                            1 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => {
                              setRating(2);
                            }}
                          >
                            2 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => {
                              setRating(3);
                            }}
                          >
                            3 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => {
                              setRating(4);
                            }}
                          >
                            4 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => {
                              setRating(5);
                            }}
                          >
                            5 <i className="ri-star-s-fill"></i>
                          </motion.span>
                        </div>

                        <div className="form__group">
                          <textarea
                            rows={4}
                            placeholder="Review message..."
                            ref={reviewMessage}
                            required
                          />
                        </div>

                        <motion.button type="submit" className="buy__btn">
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <Row className="mt-5">
                  <Col lg="6" md="5">
                    <h5>Thông Số</h5>
                    <Table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Desc</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Công suất</td>
                          <td>{information.wattage}</td>
                        </tr>
                        {information.noise ? (
                          <tr>
                            <td>Độ ồn</td>
                            <td>{information.noise}</td>
                          </tr>
                        ) : null}
                        {information.accessory ? (
                          <tr>
                            <td>Bộ lọc bụi cho máy</td>
                            <td>{information.accessory}</td>
                          </tr>
                        ) : null}
                        {information.level ? (
                          <tr>
                            <td>Mức độ lọc</td>
                            <td>{information.level}</td>
                          </tr>
                        ) : null}
                        {information.mode ? (
                          <tr>
                            <td>Chế độ hoạt động</td>
                            <td>{information.mode}</td>
                          </tr>
                        ) : null}

                        <tr>
                          <td>Công nghệ</td>
                          <td>{information.technology}</td>
                        </tr>
                        <tr>
                          <td>Kích thước</td>
                          <td>{information.size}</td>
                        </tr>
                        <tr>
                          <td>Trọng lượng</td>
                          <td>{information.weight}</td>
                        </tr>
                        <tr>
                          <td>Màu sắc</td>
                          <td>{information.color}</td>
                        </tr>
                        {information.otherFunction ? (
                          <tr>
                            <td>Tiện ích</td>
                            <td>
                              <ul className="p-0">
                                <li>{information.otherFunction}</li>
                              </ul>
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </Table>
                  </Col>
                  <Col lg="6" md="5">
                    <h5>Xuất Xứ & Bảo Hành</h5>
                    <Table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Desc</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Hãng sản xuất</td>
                          <td>{origin.manufacturer}</td>
                        </tr>
                        <tr>
                          <td>Xuất xứ</td>
                          <td>{origin.madeIn}</td>
                        </tr>
                        <tr>
                          <td>Bảo hành</td>
                          <td>{origin.guarantee}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              )}
            </Col>
            <Col lg="12" className="mt-5 mb-5">
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductsList products={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
