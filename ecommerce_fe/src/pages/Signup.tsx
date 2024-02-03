import React, { useState } from "react";

import Helmet from "../components/helmet/Helmet";
import { Col, Container, Form, FormGroup, Input, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [img, setImg] = useState<any>();
  const [lastname, setLastname] = useState<string>();
  const [firstname, setFirstname] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [address, setAddress] = useState<string>();

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImg(event.target.files[0]);
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   // Sử dụng type assertion để khẳng định e.target không phải là null
      //   const target = e.target as FileReader;
      //   setImg(target.result);
      // };
      // reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  const handleChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    if (username) formData.append('username', username);
    if (email) formData.append('email', email);
    if (password) formData.append('password', password);
    if (img) formData.append('avatar', img);
    if (lastname) formData.append('lastName', lastname);
    if (firstname) formData.append('firstName', firstname);
    if (phone) formData.append('phone', phone);
    if (address) formData.append('address', address);
    console.log(formData);

    try {

      const response = await fetch('http://localhost:8080/api/v1/signup', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        const imageUrl = img && img[0] ? URL.createObjectURL(img[0]) : '';
        const formDataObject = {
          username: username,
          email: email,
          // Không lưu mật khẩu trong localStorage vì lý do bảo mật
          avatar: img && img[0] ? URL.createObjectURL(img[0]) : ''
        };

        localStorage.setItem('formData', JSON.stringify(formDataObject));
        localStorage.setItem('isLoggedIn', 'true');
        navigate("/home");
      } else {
        console.error('Đăng ký không thành công');
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu đăng ký:', error);
    }
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Sign Up</h3>
              <Form className="auth__form" onSubmit={handleSubmit}>
                <FormGroup className="form__group">
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={handleChangeUser}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChangePass}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <Input type="file" onChange={handleChangeFile} />
                </FormGroup>

                <FormGroup className="form__group">
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastname}
                    onChange={handleChangeLastname}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstname}
                    onChange={handleChangeFirstname}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <Input
                    type="text"
                    placeholder="Enter your phone"
                    value={phone}
                    onChange={handleChangePhone}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <Input
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={handleChangeAddress}
                  />
                </FormGroup>

                <button type="submit" className="buy__btn auth__btn">
                  Create an account
                </button>
                <p>
                  Already have an account?{" "}
                  <Link to={"/login"} className="link">
                    Login
                  </Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
