import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import * as request from "../Utils/request";

import useGetData from "../custom-hooks/useGetData";
import Spinner from "react-bootstrap/Spinner";
import UserItem from "./UserItem";
const User = () => {
  const [loading, setLoading] = useState(false);

  const dataUser = useGetData();

  const handleDelete = ()=>{

  }
  const handleEdit=()=>{

  }
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12" className="pt-5">
            <table className="table">
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Username</td>
                  <td>Email</td>
                  <td>Phone</td>
                  <td>Address</td>
                  <td>Action</td>
                </tr>
              </thead>

              {loading ? (
                <h5 className="w-100 d-flex align-items-center justify-content-center  gap-2 mt-5">
                  <Spinner animation="border" variant="info" />
                  <span>Loading...</span>
                </h5>
              ) : (
                <tbody>
                  {dataUser.useData.map((item: any) => (
                    <UserItem
                      key={item.id}
                      userName={item.username}
                      email={item.email}
                      address={item.address}
                      img={item.file?.url}
                      phone= {item.phone}
                      delete={()=>handleDelete}
                      edit={()=>handleEdit}
                    />
                 
                  ))}
                </tbody>
              )}
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default User;
