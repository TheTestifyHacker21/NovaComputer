import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";

import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema } from "../validations/LoginSchema";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [alertMsg, setalertMsg] = useState("");

  const onClose = () => setShow(false);

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });




const validate = async () => { 

    setShow(false);
    const apiurl = "http://localhost:4040/adminlogin";
    
    const loginData = {
        adminemail: email,
        password: password,
    };
    
    try {
        const response = await axios.post(apiurl, loginData); 

        localStorage.removeItem("userData");

        document.cookie = "isLogedin=false; path=/;";

        document.cookie = "AdminisLogedin=true; path=/;";

        navigate("/");
        

    } catch (error) {
        setalertMsg("Login failed");
        setShow(true);
    }
};



  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <Alert
        color="danger"
        isOpen={show}
        fade={true}
        toggle={onClose}
        style={{
          position: "fixed",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          minWidth: "250px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          fontFamily: "Poppins, sans-serif",
          textAlign: "center",
        }}
      >
        {alertMsg}
      </Alert>
      <Container fluid>
        <Row className="justify-content-center">
          <Col md="6" lg="4">
            <div
              className="p-5 rounded-4 shadow-lg"
              style={{ backgroundColor: "#0F172A" }}
            >
              <h2 className="text-white text-center mb-4 fw-bold display-6">
                Admin Login
              </h2>

              <form className="div-form">
                <FormGroup>
                  <Label className="text-light mb-2">Email</Label>
                  <input
                    {...register("email", {
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                    })}
                    type="email"
                    className="form-control bg-slate-700 border-slate-600 text-white"
                    style={{
                      backgroundColor: "#374151",
                      borderColor: "#4B5563",
                      color: "white",
                    }}
                  />
                  <p className="mt-3 mb-0" style={{ color: "#FF3838" }}>
                    {errors.email?.message}
                  </p>
                </FormGroup>

                <FormGroup>
                  <Label className="text-light mb-2">Password</Label>
                  <input
                    {...register("password", {
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
                    })}
                    type="password"
                    className="form-control bg-slate-700 border-slate-600 text-white"
                    style={{
                      backgroundColor: "#374151",
                      borderColor: "#4B5563",
                      color: "white",
                    }}
                  />
                  <p className="mt-3 mb-0" style={{ color: "#FF3838" }}>
                    {errors.password?.message}
                  </p>
                </FormGroup>

                <FormGroup className="d-flex align-items-center mb-3">
                  <Input type="checkbox" className="me-2" />
                  <Label className="text-light mb-0">Remember Me</Label>
                </FormGroup>

                <FormGroup>
                  <Button
                    onClick={submitForm(validate)}
                    className="w-100 py-2 fw-semibold border-0"
                    style={{ backgroundColor: "#2563eb" }}
                  >
                    Sign In
                  </Button>
                </FormGroup>

                <FormGroup className="text-center">
                  <Label className="text-light">
                    <Link
                      to="/"
                      className="text-white-400 text-decoration-none"
                    >
                      Back To Home
                    </Link>
                  </Label>
                </FormGroup>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;
