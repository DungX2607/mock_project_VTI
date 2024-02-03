import React, { useEffect, useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/helmet/Helmet";
import { Col, Container, Row } from "reactstrap";

import Spinner from "react-bootstrap/Spinner";

import "../styles/Shop.scss";
import { ProductProps } from "../model/productProps";

import ProductsList from "../components/UI/ProductsList";
import { categoryList } from "../model/categoryData";
import { trending } from "../model/categoryTrending/trending";
import useGetData from "../custom-hooks/useGetData";

type productData = ProductProps;

const category = categoryList;

const Shop = () => {
  const products = useGetData().products;

  const [productsData, setProductsData] =
    useState<Array<productData>>(products);

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = event.target.value;

    if (filterValue === "all") {
      // const filterProducts = products.filter((item)=>item.category==="Filter By Category");
      setProductsData(products);
    }

    if (filterValue === trending.product[0].value) {
      const filterProducts = products.filter(
        (item) => item.category === trending.product[0].value
      );
      setProductsData(filterProducts);
    }

    if (filterValue === trending.product[1].value) {
      const filterProducts = products.filter(
        (item) => item.category === trending.product[1].value
      );
      setProductsData(filterProducts);
    }

    if (filterValue === trending.product[2].value) {
      const filterProducts = products.filter(
        (item) => item.category === trending.product[2].value
      );
      setProductsData(filterProducts);
    }

    if (filterValue === trending.product[3].value) {
      const filterProducts = products.filter(
        (item) => item.category === trending.product[3].value
      );
      setProductsData(filterProducts);
    }

    if (filterValue === trending.product[4].value) {
      const filterProducts = products.filter(
        (item) => item.category === trending.product[4].value
      );
      setProductsData(filterProducts);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value;

    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchItem.toLowerCase())
    );
    setProductsData(searchedProducts);
  };

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <Helmet title="Shop">
      <CommonSection title={"Products"} />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  {category.map((item, index) => (
                    <option className="p-5" key={index} value={item.value}>
                      {item.option}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="mb-3">
              <div className="filter__widget ">
                <select>
                  <option>Soft By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>

            <Col lg="6" md="12">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search... "
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="d-flex align-items-center justify-content-center  gap-2 m-5 fs-4">
                <Spinner animation="border" variant="info" />
                <span>No products are found</span>
              </h1>
            ) : (
              <ProductsList products={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
