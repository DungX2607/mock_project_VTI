import React, { useEffect, useState } from "react";
import Helmet from "../components/helmet/Helmet";

import { Container, Row, Col } from "reactstrap";
import "../styles/Home.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Spinner from "react-bootstrap/Spinner";

import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";

// import products from "../assets/data/products";
import { ProductProps } from "../model/productProps";
import Clock from "../components/UI/Clock";
import useGetData from "../custom-hooks/useGetData";
import { trending } from "../model/categoryTrending/trending";
import { homeData } from "../assets/data/home";


const heroImg = require("../assets/images/hero-img.png");
const counterImg = require("../assets/images/counter-timer-img.png");

const Home = () => {
  const year = new Date().getFullYear();

  const [loading, setLoading] = useState(false);

  const products = useGetData().products;

  const [trendingProduct, setTrendingProduct] =
    useState<Array<ProductProps>>(products);

  const [BestSalesProduct, setBestSalesProduct] =
    useState<Array<ProductProps>>(products);

  const [airPurifierProduct, setAirPurifierProduct] =
    useState<Array<ProductProps>>(products);

  const [dehumidifiersProduct, setDehumidifiersProduct] =
    useState<Array<ProductProps>>(products);

  const [robotProduct, setRobotProduct] =
    useState<Array<ProductProps>>(products);

  const [SterilizerProduct, setSterilizerProduct] =
    useState<Array<ProductProps>>(products);

  const [milkWarmerProduct, setMilkWarmerProduct] =
    useState<Array<ProductProps>>(products);

  useEffect(() => {
    const filteredTrendingProduct = products.filter(
      (item) => item.category === trending.trending.toString()
    );

    const filteredBestSalesProduct = products.filter(
      (item) => item.category === trending.bestSales.toString()
    );
    const filteredAirPurifier = products.filter(
      (item) => item.category === trending.product[0].value
    );

    const filteredDehumidifiers = products.filter(
      (item) => item.category === trending.product[1].value
    );
    const filteredRobot = products.filter(
      (item) => item.category === trending.product[2].value
    );

    const filteredSterilizer = products.filter(
      (item) => item.category === trending.product[3].value
    );

    const filteredMilkWarmer = products.filter(
      (item) => item.category === trending.product[4].value
    );

    setTrendingProduct(filteredTrendingProduct);
    setBestSalesProduct(filteredBestSalesProduct);
    setAirPurifierProduct(filteredAirPurifier);
    setDehumidifiersProduct(filteredDehumidifiers);
    setRobotProduct(filteredRobot);
    setSterilizerProduct(filteredSterilizer);
    setMilkWarmerProduct(filteredMilkWarmer);

    if (products.length) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [products]);

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending Product in {year}</p>
                <h2>{homeData.title}</h2>
                <p>{homeData.text}</p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to={"/shop"} className="link">
                    SHOP NOW
                  </Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="hero img" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />
      {loading ? (
        <h5 className="d-flex align-items-center justify-content-center  gap-2 m-5">
          <Spinner animation="border" variant="info" />
          <span>Loading...</span>
        </h5>
      ) : (
        <>
          <section className="trending__products">
            <Container>
              <Row>
                <Col lg="12" className="text-center">
                  <h2 className="section__title">Trending Products</h2>
                </Col>
                <ProductsList products={trendingProduct} />
              </Row>
            </Container>
          </section>

          <section className="best__sales mt-0">
            <Container>
              <Row>
                <Col lg="12" className="text-center">
                  <h2 className="section__title">Best Sales</h2>
                </Col>
                <ProductsList products={BestSalesProduct} />
              </Row>
            </Container>
          </section>

          <section className="timer-count">
            <Container>
              <Row>
                <Col lg="6" md="12" className="count__down-col">
                  <div className="clock__top-content">
                    <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                    <h3 className="text-white fs-5 mb-3">Quality Machine</h3>
                  </div>
                  <Clock />

                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="buy__btn store__btn"
                  >
                    <Link to={"/shop"} className="link">
                      Visit Store
                    </Link>
                  </motion.button>
                </Col>
                <Col lg="6" md="12" className="text-end counter__img">
                  <img src={counterImg} alt="count img" />
                </Col>
              </Row>
            </Container>
          </section>

          <section className="new__arrivals">
            <Container>
              <Row>
                <Col lg="12" className="text-center mb-5">
                  <h2 className="section__title">New Arrivals</h2>
                </Col>
                <ProductsList products={dehumidifiersProduct} />
                <ProductsList products={robotProduct} />
              </Row>
            </Container>
          </section>

          <section className="popular__category">
            <Container>
              <Row>
                <Col lg="12" className="text-center mb-5">
                  <h2 className="section__title">Popular in Category</h2>
                </Col>

                <ProductsList products={milkWarmerProduct} />
                <ProductsList products={SterilizerProduct} />
              </Row>
            </Container>
          </section>
        </>
      )}
    </Helmet>
  );
};

export default Home;
