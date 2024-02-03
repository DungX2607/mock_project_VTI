// import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Spinner from "react-bootstrap/Spinner";

import * as request from "../Utils/request";
import { categoryList } from "../model/categoryData";

import "../styles/AddProduct.scss";
import { useLocation, useParams } from "react-router-dom";
import { ProductProps } from "../model/productProps";

const options = categoryList.slice(1);

const AddProducts = () => {
  const location = useLocation();

  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState<any>();
  const [description, setDescription] = useState<any>("");
  const [price, setPrice] = useState("");
  const [priceSales, setPriceSales] = useState("");
  const [category, setCategory] = useState("");
  const [productImg, setProductImg] = useState<any>();

  const [manufacturer, setManufacturer] = useState<any>("");
  const [madeIn, setMadeIn] = useState<any>("");
  const [guarantee, setGuarantee] = useState<any>("");


  const [wattage, setWattage] = useState<any>("");
  const [noise, setNoise] = useState<any>("");
  const [technology, setTechnology] = useState<any>("");

  const [level, setLevel] = useState<any>("");
  const [mode, setMode] = useState<any>("");
  const [accessory, setAccessory] = useState<any>("");

  const [size, setSize] = useState<any>("");
  const [weight, setWeight] = useState<any>("");
  const [color, setColor] = useState<any>("");
  const [functionP, setFunctionP] = useState<any>("");


  const [loading, setLoading] = useState(false);

  const [productDetail, setProductDetail] = useState<
    ProductProps & { categoryId: string }
  >({
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
    categoryId: "",
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
    information:{
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
    }

  });

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeShortDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShortDescription(event.target.value);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    Number(event.target.value) < 0
      ? setPrice("0")
      : setPrice(event.target.value);
  };

  const handleChangePriceSales = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    Number(event.target.value) < 0
      ? setPriceSales("0")
      : setPriceSales(event.target.value);
  };

  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategory(event.target.value);
  };
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductImg(event.target.files?.[0]);
  };

  const handleChangeManufacturer = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setManufacturer(event.target.value);
  };

  const handleGuarantee = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuarantee(event.target.value);
  };

  const handleMadeIn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMadeIn(event.target.value);
  };



  const handleWattage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWattage(event.target.value);
  };

  const handleNoise = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoise(event.target.value);
  };

  const handleTechnology = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTechnology(event.target.value);
  };

  const handleLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(event.target.value);
  };

  const handleMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.value);
  };

  const handleAccessory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessory(event.target.value);
  };

  const handleSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  const handleWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };

  const handleColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleFunction = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunctionP(event.target.value);
  };



  const config = {
    // withCredentials: true,
    "Content-Type": "application/auto",
    // Authorization: "Basic " + localStorage.getItem("cookie"),
    // 'Access-Control-Allow-Origin': false ,
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("productName", title);
    formData.append("shortDesc", shortDescription);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("sales", priceSales);
    formData.append("category", category);
    formData.append("file", productImg as File);
    formData.append("manufacturer", manufacturer);
    formData.append("madeIn", madeIn);
    formData.append("guarantee", guarantee);


    const dataInfo : { [key: string]: any } ={
      wattage: wattage,
      noise: noise,
      technology: technology,
      level: level,
      mode: mode,
      accessory: accessory,
      size:size,
      weight: weight,
      color: color,
      otherFunction: functionP

    }
    formData.append("information", JSON.stringify(dataInfo));



    setLoading(true);

    if (id) {

      formData.append("originId", productDetail.origin?.id);
      formData.append("fileId", productDetail.file?.id);
      formData.append("categoryId", productDetail.categoryId);

      formData.delete("information");
      dataInfo.id= productDetail.information?.id;
      formData.append("information", JSON.stringify(dataInfo));

      console.log(productDetail.file?.id)

      try {
        request
          .put1(`products/update-product/${id}`, { headers: config }, formData)
          .then(() => {
            toast.success("Product successfully update");
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
            toast.error("Product fail update!");
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        request
          .post1<ResponseType>(
            "products/new-products",
            { headers: config },
            formData
          )
          .then((response) => {
            // Handle the successful response here

            toast.success("Product successfully added");
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            // Handle any errors that occurred during the request
            toast.error("Product fail added!");
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getProductById = async () => {
    try {
      await request
        .get(`products/${Number(id)}`, { headers: config })
        .then((res) => {
          setProductDetail(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    if (id) {
      getProductById();
    }
  }, []);

  useEffect(() => {
    if (productDetail) {
      setTitle(productDetail.productName);
      setPrice(productDetail.price.toString());
      setPriceSales(productDetail.priceSales.toString());
      setCategory(productDetail.category);
      setShortDescription(productDetail.shortDesc);
      setDescription(productDetail.description);
      setManufacturer(productDetail.origin?.manufacturer);
      setMadeIn(productDetail.origin?.madeIn);
      setGuarantee(productDetail.origin?.guarantee);

      setWattage(productDetail.information?.wattage);
      setNoise(productDetail.information?.noise);
      setTechnology(productDetail.information?.technology);
      setAccessory(productDetail.information?.accessory);
      setWeight(productDetail.information?.weight);
      setColor(productDetail.information?.color);
      setMode(productDetail.information?.mode);
      setLevel(productDetail.information?.level);
      setFunctionP(productDetail.information?.otherFunction);
      setSize(productDetail.information?.size);

    }
  }, [productDetail]);


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
              <>
                <h4 className="mb-5">
                  {location.pathname.startsWith("/dashboard/edit-product")
                    ? "Edit products"
                    : "Add products"}
                </h4>
                <Form onSubmit={handleSubmit}>
                  <div className="container__product">
                    <FormGroup className="form__group">
                      <span>Tên sản phẩm</span>
                      <Input
                        type="text"
                        placeholder="Product name"
                        value={title}
                        onChange={handleChangeTitle}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="form__group">
                      <span>Mô tả</span>

                      <Col>
                        <Input
                          name="text"
                          type="textarea"
                          placeholder="Short Desc..."
                          value={shortDescription}
                          onChange={handleChangeShortDescription}
                          required
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup className="form__group">
                      <span>thông tin chi tiết</span>

                      <Col>
                        <Input
                          name="text"
                          type="textarea"
                          placeholder="description..."
                          value={description}
                          onChange={handleChangeDescription}
                          required
                        />
                      </Col>
                    </FormGroup>

                    <div className="d-flex align-items-center justify-content-between gap-5">
                      <FormGroup className="form__group w-50">
                        <span>Đơn giá</span>
                        <Input
                          type="number"
                          placeholder="VND"
                          value={price}
                          onChange={handleChangePrice}
                          required
                        />
                      </FormGroup>

                      <FormGroup className="form__group w-50">
                        <span>Sales</span>
                        <Input
                          type="number"
                          placeholder="%"
                          value={priceSales}
                          onChange={handleChangePriceSales}
                          required
                        />
                      </FormGroup>

                      <FormGroup className="form__group w-50">
                        <span>Loại sản phẩm</span>
                        <Input
                          className="w-100 p-2"
                          name="select"
                          type="select"
                          value={category}
                          onChange={handleChangeCategory}
                          required
                        >
                          {options.map((item, index) => (
                            <option key={index} value={item.value}>
                              {item.option}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </div>
                    {id ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <FormGroup
                          style={{
                            width: "15rem",
                            height: "15rem",
                          }}
                        >
                          <img
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                            src={productDetail?.file?.url}
                          ></img>
                        </FormGroup>
                      </div>
                    ) : (
                      ""
                    )}

                    <div>
                      <FormGroup className="form__group">
                        <span>Hình ảnh</span>
                        <Input
                         
                          type="file"
                          onChange={handleChangeImg}
                          required
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="product__info-container">
                    <h5>Thông tin Sản phẩm</h5>

                    <FormGroup row>
                      <Label sm={2}>Thương hiệu</Label>
                      <Col>
                        <Input
                          placeholder="Thương hiệu"
                          type="text"
                          value={manufacturer}
                          onChange={handleChangeManufacturer}
                          required
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label sm={2}>Xuất xứ</Label>
                      <Col>
                        <Input
                          placeholder="Nơi sản xuất"
                          type="text"
                          value={madeIn}
                          onChange={handleMadeIn}
                          required
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label sm={2}>Bảo hành</Label>
                      <Col>
                        <Input
                          placeholder="Bảo hành"
                          type="text"
                          value={guarantee}
                          onChange={handleGuarantee}
                          required
                        />
                      </Col>
                    </FormGroup>
                  </div>

                  <div className="product__info-container">
                    <h5>Thông số sản phẩm</h5>

          
                      <FormGroup row>
                        <Label sm={2}>Công suất</Label>
                        <Col>
                          <Input placeholder="Wat" type="text" value={wattage} onChange={handleWattage} required />
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label sm={2}>Độ ồn</Label>
                        <Col>
                          <Input placeholder="Db" type="text" value={noise} onChange={handleNoise} required />
                        </Col>
                      </FormGroup>

                

                    <FormGroup row >
                      <Label sm={2}>Công nghệ</Label>
                      <Col>
                        <Input placeholder="Công nghệ" type="text" value={technology} onChange={handleTechnology} required />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={2}>Level</Label>
                      <Col>
                        <Input placeholder="Level" type="text" value={level||''} onChange={handleLevel}  />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label sm={2}>Chế độ</Label>
                      <Col>
                        <Input placeholder="Chế độ hoạt động" type="text" value={mode||''} onChange={handleMode}  />
                      </Col>
                    </FormGroup>


                    <FormGroup row>
                      <Label sm={2}>Phụ kiện</Label>
                      <Col>
                        <Input placeholder="Phụ kiện" type="text"  value={accessory||''} onChange={handleAccessory}  />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label sm={2}>Kích thước</Label>
                      <Col>
                        <Input placeholder="Kích thước" type="text" value={size} onChange={handleSize} required />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label sm={2}>Cân nặng</Label>
                      <Col>
                        <Input placeholder="Cân nặng" type="text" value={weight} onChange={handleWeight} required />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label sm={2}>Màu sắc</Label>
                      <Col>
                        <Input placeholder="Màu sắc" type="text" value={color} onChange={handleColor} required />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label sm={2}>Chức năng</Label>
                      <Col>
                        <Input placeholder="Chức năng" type="text" value={functionP} onChange={handleFunction}  />
                      </Col>
                    </FormGroup>
                  </div>

                  <button className="buy__btn ">
                    {id ? "Update" : "Add product"}
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
