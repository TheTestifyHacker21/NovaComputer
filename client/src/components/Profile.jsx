import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Alert,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Profile = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");



  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);



    if (!user) {
    return "nothing";
  }


  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);


  return (
    <div className="d-flex align-items-center justify-content-center mt-5 mb-5">
      <Alert
        color="success"
        isOpen={show}
        fade={true}
        toggle={() => setShow(false)}
        style={{
          position: "fixed",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          minWidth: "250px",
          textAlign: "center",
          zIndex: 1000,
        }}
      >
        {alertMsg}
      </Alert>

      <Container fluid>
        <Row className="justify-content-center">
          <Col md="8" lg="6" xl="5">
            <div
              className="p-5 rounded-4 shadow-lg"
              style={{ backgroundColor: "#0F172A" }}
            >
              <h2 className="text-white text-center mb-4 fw-bold display-6">
                Profile
              </h2>

              <div className="text-center mb-4">
                <div
                  className="rounded-circle mx-auto overflow-hidden"
                  style={{
                    width: "150px",
                    height: "150px",
                    border: "4px solid #2563eb",
                  }}
                >
                  <img
                    src={user.profilepic}
                    alt="Profile"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>

              <Card
                className="mb-4"
                style={{ backgroundColor: "#1e293b", borderColor: "#334155" }}
              >
                <CardBody>
                  <Row>
                    <Col md="6">
                      <CardTitle style={{ color: "#60a5fa" }} className="mb-2">
                        Username
                      </CardTitle>
                      <CardText className="text-white fs-5">
                        {user.uname}
                      </CardText>
                    </Col>
                    <Col md="6">
                      <CardTitle style={{ color: "#60a5fa" }} className="mb-2">
                        Email
                      </CardTitle>
                      <CardText className="text-white fs-5">
                        {user.email}
                      </CardText>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card
                className="mb-4"
                style={{ backgroundColor: "#1e293b", borderColor: "#334155" }}
              >
                <CardBody>
                  <CardTitle style={{ color: "#60a5fa" }} className="mb-2">
                    Account Details
                  </CardTitle>
                  <Row>
                    <Col md="6">
                      <CardText className="text-light mb-2">
                        <span style={{ color: "#60a5fa" }}>User ID:</span>{" "}
                        <span style={{ color: "#9ca3af" }}>
                          {user._id.substring(0, 8)}
                        </span>
                      </CardText>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <div className="text-center mt-4">
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "#60a5fa" }}
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
