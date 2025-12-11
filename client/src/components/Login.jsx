import  { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
  Alert,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginSchema } from "../validations/LoginSchema";
import { getUser, clearTimer, setTimer , resetData} from "../features/UserSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);
  const navigate = useNavigate();
  const message = useSelector((state) => state.users.message);
  const enableBtn = useSelector((state) => state.users.enableBtn);
  const errorCount = useSelector((state) => state.users.errorCount);
  const userData = useSelector((state) => state.users.user);
  const isLoading = useSelector((state) => state.users.isLoading);

  const [show, setShow] = useState(false);

  const [alertMsg, setalertMsg] = useState("");

  const onClose = () => setShow(false);

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) , mode: "onChange" });

  const validate = (data) => {
    dispatch(getUser(data));
  };

  
  const startOneMinuteTimer = () => {

    dispatch(clearTimer());

    const id = setTimeout(() => {
      dispatch(clearTimer());
    }, 60000);

    console.log("Timer start");

    dispatch(setTimer(id));

  };


  useEffect(() => {
    if (userData && isSuccess) {
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdminLoggedIn", "false");
      dispatch(resetData());
      navigate("/profile");
    } else if (isError || message) {
      setalertMsg(message);
      setShow(true);
      errorCount >= 5 ? startOneMinuteTimer() : null;
    }
  }, [userData, isSuccess, isError, navigate, message, errorCount]);



  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <Alert
        color={message.includes("Registered") ? "success" : "danger"}
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
                Login
              </h2>

              <form className="div-form">
                <FormGroup>
                  <Label className="text-light mb-2" for="email">Email</Label>
                  <input
                    {...register("email", {
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                    })}
                    type="email"
                    id="email"
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
                  <Label className="text-light mb-2" for="password">Password</Label>
                  <input
                    {...register("password", {
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
                    })}
                    type="password"
                    id="password"
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
                    disabled={enableBtn || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm">Loading...</Spinner>
                        <span> Loading</span>
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </FormGroup>

                <FormGroup className="text-center">
                  <Label className="text-light">
                    No Account ? {"  "}
                    <Link
                      to="/register"
                      className="text-blue-400 text-decoration-none"
                    >
                      Sign Up Now
                    </Link>
                  </Label>
                </FormGroup>

                <FormGroup className="text-center">
                  <Label className="text-light">
                    An Admin ? {"  "}
                    <Link
                      to="/AdminLogin"
                      className="text-blue-400 text-decoration-none"
                    >
                      Go Here
                    </Link>
                  </Label>
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

export default Login;
