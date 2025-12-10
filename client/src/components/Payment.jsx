import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  Spinner,
  Alert,
  CardBody,
} from "reactstrap";
import { FaCreditCard } from "react-icons/fa";
import { validZipData, paymentSchema } from "../validations/PaymentSchema";
import { useDispatch } from "react-redux";

const Payment = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [taxRate, setTaxRate] = useState(0.1);
  const [shippingCost, setShippingCost] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);

  const [alertMsg, setalertMsg] = useState("");

  const onClose = () => setShow(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentSchema),
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return JSON.parse(saved);
  });

  const calculateSubtotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.qty;
    });
    return total;
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * taxRate;
  const shipping = subtotal > 0 ? shippingCost : 0;
  const total = subtotal + tax + shipping;

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);

    const foundData = validZipData.find((item) => item.city === selectedCity);
    if (foundData) {
      setZipCode(foundData.zip);
      setTaxRate(foundData.tax);
      setShippingCost(foundData.shipping);
    } else {
      setZipCode("");
      setTaxRate(0.1);
      setShippingCost(0);
    }
  };

  const cityOptions = validZipData.map((item) => item.city);

  const handleSubmit = async () => {
    const savedUserinfo = localStorage.getItem("userData");

    if (!savedUserinfo) {
      alert("Please log in to proceed with the payment.");
      navigate("/login");
      return;
    }

    const savedUser = JSON.parse(savedUserinfo);

    const savedUserName = savedUser.email;

    const productInfo = cart.map((item) => ({
      productId: item._id,
      quantity: item.qty,
      productName: item.pname,
      price: item.price,
      totalPrice: item.price * item.qty,
    }));

    const dataToSave = {
      email: savedUserName,
      OrderDate: new Date(),
      price: total,
      address: address,
      city: city,
      productInfo: productInfo,
    };

    setIsLoading(true);

    try {
      const apiurl = "https://novacomputer-server.onrender.com/orders";
      const response = await axios.post(apiurl, dataToSave);
      navigate("/profile");
    } catch (error) {
      console.error("Order submission error:", error);
      setalertMsg("Order submission failed.");
      setShow(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 text-light">
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
      <Container className="py-5">
        <h1 className="text-white mb-4">Checkout</h1>

        <Row>
          <Col lg={8} className="mb-4 mb-lg-0">
            <Card
              className="p-3 mb-4 rounded-3"
              style={{ backgroundColor: "#0F172A" }}
            >
              <CardBody>
                <form>
                  <h2 className="text-white mb-4">Shipping Information</h2>

                  <div className="mb-4">
                    <h5 className="text-white mb-3">Address</h5>
                    <FormGroup>
                      <Label for="address" className="text-light">
                        Address
                      </Label>
                      <input
                        {...register("address", {
                          value: address,
                          onChange: (e) => setAddress(e.target.value),
                        })}
                        type="text"
                        id="address"
                        className="form-control"
                        style={{ backgroundColor: "#c1cbdaff" }}
                      />
                      {errors.address ? (
                        <div className="text-danger mt-1">
                          {errors.address.message}
                        </div>
                      ) : null}
                    </FormGroup>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-white mb-3">Shipping Details</h5>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="city" className="text-light">
                            City
                          </Label>

                          <select
                            {...register("city", {
                              value: city,
                              onChange: handleCityChange,
                            })}
                            className="form-control"
                            id="city"
                            style={{ backgroundColor: "#c1cbdaff" }}
                          >
                            <option value="">Select a city</option>
                            {cityOptions.map((cityName, index) => (
                              <option key={index} value={cityName}>
                                {cityName}
                              </option>
                            ))}
                          </select>

                          {errors.city ? (
                            <div className="text-danger mt-1">
                              {errors.city.message}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="zipCode" className="text-light">
                            ZIP Code
                          </Label>
                          <input
                            type="text"
                            id="zipCode"
                            className="form-control"
                            value={zipCode}
                            readOnly
                            style={{
                              backgroundColor: "#c1cbdaff",
                              cursor: "not-allowed",
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <Card className="mt-4" style={{ backgroundColor: "#0F172A" }}>
                    <CardBody>
                      <h2 className="text-white mb-4">
                        <FaCreditCard className="me-2" />
                        Payment Information
                      </h2>

                      <FormGroup>
                        <Label for="cardNumber" className="text-light">
                          Card Number
                        </Label>
                        <input
                          {...register("cardNumber", {
                            value: cardNumber,
                            onChange: (e) => setCardNumber(e.target.value),
                          })}
                          type="text"
                          id="cardNumber"
                          className="form-control"
                          placeholder="1234 5678 9012 3456"
                          style={{ backgroundColor: "#c1cbdaff" }}
                        />
                        {errors.cardNumber ? (
                          <div className="text-danger mt-1">
                            {errors.cardNumber.message}
                          </div>
                        ) : null}
                      </FormGroup>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="expiryDate" className="text-light">
                              Expiry Date
                            </Label>
                            <input
                              {...register("expiryDate", {
                                value: expiryDate,
                                onChange: (e) => setExpiryDate(e.target.value),
                              })}
                              type="date"
                              id="expiryDate"
                              className="form-control"
                              style={{ backgroundColor: "#c1cbdaff" }}
                            />
                            {errors.expiryDate ? (
                              <div className="text-danger mt-1">
                                {errors.expiryDate.message}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="cvv" className="text-light">
                              CVV
                            </Label>
                            <input
                              {...register("cvv", {
                                value: cvv,
                                onChange: (e) => setCvv(e.target.value),
                              })}
                              type="text"
                              id="cvv"
                              className="form-control"
                              placeholder="123"
                              style={{ backgroundColor: "#c1cbdaff" }}
                            />
                            {errors.cvv ? (
                              <div className="text-danger mt-1">
                                {errors.cvv.message}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>

                  <Button
                    onClick={submitForm(handleSubmit)}
                    color="primary"
                    size="lg"
                    className="w-100 mt-4"
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm">Loading...</Spinner>
                        <span> Loading</span>
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>

                  <FormGroup className="text-center mt-5">
                    <Link
                      to="/products"
                      className="text-white text-decoration-none bg-danger p-2 rounded-2 fw-semibold"
                    >
                      Back To Products
                    </Link>
                  </FormGroup>
                </form>
              </CardBody>
            </Card>
          </Col>

          <Col lg={4}>
            <Card
              className="p-2 sticky-top"
              style={{ top: "20px", backgroundColor: "#0F172A" }}
            >
              <CardBody>
                <h2 className="text-white mb-4">Order Summary</h2>

                {cart.map((item) => (
                  <div key={item._id} className="mb-3">
                    <div className="d-flex justify-content-between text-light mb-2">
                      <span>
                        {item.pname} &nbsp; &nbsp; ( x {item.qty} )
                      </span>
                      <span>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  </div>
                ))}

                <div className="border-top border-secondary pt-3">
                  <div className="d-flex justify-content-between text-light mb-2">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="d-flex justify-content-between text-light mb-2">
                    <span>Shipping ({city || "Select city"})</span>
                    <span
                      className={
                        shippingCost > 0 ? "text-warning" : "text-success"
                      }
                    >
                      ${shippingCost.toFixed(2)}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between text-light mb-2">
                    <span>Tax ({taxRate * 100}%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="border-top border-secondary pt-3 mt-2">
                    <div className="d-flex justify-content-between">
                      <span className="h4 text-white">Total</span>
                      <span className="h4 text-white">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Payment;
