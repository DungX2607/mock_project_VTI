import React, { useState } from "react";
import Helmet from "../components/helmet/Helmet";
import { Col, Container, Row, Form, FormGroup, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

import "../styles/Login.scss";
import { toast } from "react-toastify";
// @ts-ignore
import { KJUR } from 'jsrsasign';


const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>();

  const [password, setPassword] = useState<string>();

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('isLoggedIn', 'true');

      //Giải mã token để lấy role
      const userRole = data.userDetails.authorities.authority;
      const userAuthority = data.userDetails && data.userDetails.authorities && data.userDetails.authorities.length > 0
        ? data.userDetails.authorities[0].authority
        : null;
      if (userAuthority === 'ADMIN') {
        navigate('/dashboard');
      } else {
        navigate('/home');
      }
      // try {
      //   const decodedToken = KJUR.jws.JWS.parse(data.token);
      //   console.log('Decoded Token:', decodedToken);
      //   if (decodedToken && decodedToken.payloadObj) {
      //     const userRole = decodedToken.payloadObj.roles;

      //     if (userRole === 'ADMIN') {
      //       navigate('/dashboard');
      //     } else {
      //       navigate('/home');
      //     }
      //   }
      // } catch (error) {
      //   console.error("Lỗi khi giải mã token: ", error);
      // }
    } else {
      setTimeout(() => {
        toast.warn("Đăng nhập thất bại!", {
          position: toast.POSITION.TOP_CENTER
        });
      }, 500);
    }
  }

  const loading = false;

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="d-flex align-items-center justify-content-center gap-2">
                  <Spinner animation="border" variant="info" />
                  <span>Loading...</span>
                </h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Login</h3>
                <Form className="auth__form" onSubmit={handleSubmit}>
                  <FormGroup className="form__group">
                    <Input
                      type="text"
                      placeholder="enter your username"
                      value={username}
                      onChange={handleChangeUsername}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <Input
                      type="password"
                      placeholder="enter your password"
                      value={password}
                      onChange={handleChangePassword}
                    />
                  </FormGroup>

                  <button type="submit" className="buy__btn auth__btn">
                    Login
                  </button>
                  <p>
                    Don't have account?{" "}
                    <Link to={"/signup"} className="link">
                      Create an account
                    </Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
function jwt_decode(token: any): { [key: string]: string; } {
  throw new Error("Function not implemented.");
}

