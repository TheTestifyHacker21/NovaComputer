import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

const ProductInfo = () => {
  const productId = useParams().productId;
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const product = products.find((p) => p._id === productId);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const goToPayment = () => {
    navigate("/Payment");
  };

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });



  useEffect(() => {
    if (!product) {
      navigate("/products");
    }
  }, [productId, products, products, navigate]);

  if (!product) {
    return "nothing";
  }

  
  useEffect(() => {

    localStorage.setItem( "cart"  , JSON.stringify(cart));

  }, [cart]);


  
  function addToCart(product) {
    
    const item = cart.find((i) => i._id === product._id);

    if (item) {
      alert("Item Already In Your Cart 🟡🟡");
    } else {
      const newCart = cart.concat({
        _id: product._id,
        pname: product.pname,
        price: product.price,
        imgUrl: product.imgUrl,
        pstock: product.pstock,
        qty: 1,
      });
      setCart(newCart);
      alert("New item added ➕➕✅");
    }
  }




const incrementQty = (id) => {
  const newCart = cart
    .map((item) => {
      if (item._id === id) {
        return {
          ...item,
          qty: item.qty + 1 > item.pstock ? item.pstock : item.qty + 1,
        };
      }
      return item;
    });
  setCart(newCart);
};





const decrementQty = (id) => {

  const updatedCart = cart.map((item) => {
    if (item._id === id) {
      return { ...item, qty: item.qty - 1 };
    }
    return item;
  });

  const newCart = updatedCart.filter((item) => item.qty > 0);

  setCart(newCart);
};



const removeItem = (id) => {

  const newCart = cart.filter((item) => item._id !== id);

  setCart(newCart);
  
};




  const alltotals = cart.map((item) => item.price * item.qty);

  let totalPrice = 0;

  alltotals.forEach((sub) => {
    totalPrice += sub;
  });





  return (
    <Container className="py-4 min-vh-100 mb-5">
      <Row className="mb-5">
        <Col xs="6">
          <Link to="/products" className="text-decoration-none text-secondary">
            <span>← Back to Products</span>
          </Link>
        </Col>
        <Col xs="6" className="text-end">
          <Button
            className="position-relative"
            color="primary"
            onClick={toggle}
          >
            <MdOutlineShoppingCart className="me-2" />
            Cart
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md="6">
          <img
            src={product.imgUrl}
            alt={product.pname}
            className="img-fluid rounded"
            style={{
              width: "100%",
              height: "500px",
            }}
          />
        </Col>

        <Col md="6">
          <div className="mb-2 text-primary fs-5">{product.category}</div>
          <h1 className="mb-3 fw-bold">{product.pname}</h1>
          <p className="mb-4">{product.pinformation}</p>

          <div
            className="mb-4 border-0 rounded-3"
            style={{ backgroundColor: "#0F172A" }}
          >
            <div className="p-4">
              <div className="d-flex mb-3 flex-column">
                <h2 style={{ color: "#22C55E" }}>${product.price}</h2>
                <span className="text-light mt-2">
                  Stock :
                  <span style={{ color: "#22C55E" }}>
                    &nbsp; {product.pstock} Units available
                  </span>
                </span>
              </div>

              <Button
                className="w-100 py-3 fw-bold"
                color="primary"
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
              >
                <MdOutlineShoppingCart /> &nbsp;
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>

          <div
            className="border-0 shadow-sm p-3 rounded-2"
            style={{ backgroundColor: "#0F172A" }}
          >
            <div>
              <h5 className="mb-3">Product Details</h5>
            </div>
            <div>
              <Row className="mb-2">
                <Col xs="6">
                  <span>Category:</span>
                </Col>
                <Col xs="6" className="text-end">
                  <span className="fw-bold">{product.category}</span>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col xs="6">
                  <span>Availability:</span>
                </Col>
                <Col xs="6" className="text-end">
                  <span
                    className={`fw-bold ${
                      product.inStock ? "text-success" : "text-danger"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col xs="6">
                  <span>Product ID:</span>
                </Col>
                <Col xs="6" className="text-end">
                  <span className="fw-bold">{product._id}</span>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggle} centered size="lg">
        <ModalHeader
          toggle={toggle}
          style={{ backgroundColor: "#3f4f72ff", color: "white" }}
        >
          Shopping Cart
        </ModalHeader>
        <ModalBody style={{ backgroundColor: "#3f4f72ff", color: "white" }}>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item._id} className="d-flex align-items-center mb-3">
                  {/* ✅ show image */}
                  <img
                    src={item.imgUrl}
                    alt={item.pname}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />

                  <div className="flex-grow-1">
                    <span>{item.pname}</span>
                    <div className="d-flex align-items-center mt-2">
                      {/* ✅ subtract button */}
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={() => decrementQty(item._id)}
                        className="me-2"
                      >
                        −
                      </Button>

                      <span>{item.qty}</span>

                      {/* ✅ add button (disabled if qty == stock) */}
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={() => incrementQty(item._id)}
                        className="ms-2"
                        disabled={item.qty >= item.pstock}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="d-flex flex-column">
                    <span className="ms-3">${item.price * item.qty}</span>
                    <Button
                      className="ms-3 bg-transparent border-0 text-danger mt-1"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <hr className="text-white" />
              <div className="d-flex justify-content-between mt-3">
                <span className="fw-bold">Total:</span>
                <span className="fw-bold">${totalPrice}</span>
              </div>
            </>
          )}
        </ModalBody>

        <ModalFooter style={{ backgroundColor: "#3f4f72ff" }}>
          <Button
            color="primary"
            onClick={goToPayment}
            disabled={cart.length === 0}
            style={{ width: "100%" }}
          >
            Proceed to Payment
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default ProductInfo;
