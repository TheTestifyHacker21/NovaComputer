import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/ProductSlice";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { MdOutlineShoppingCart } from "react-icons/md";

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const goToPayment = () => {
    navigate("/payment");
  };

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  
  const handleItemClick = (productId) => {
    navigate(`/productInfo/${productId}`);
  };

  const filteredProducts =
    filter == "All"
      ? products
      : products.filter((product) => product.category === filter);

  const categories = [
    "All",
    "CPU",
    "GPU",
    "RAM",
    "Storage",
    "Power Supply",
    "Motherboard",
    "Cooling",
    "Case",
  ];

  return (
    <div className="container py-5">
      <h1 className="mb-5">Our Products</h1>

      <div className="mb-5 d-flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className="btn"
            style={{
              backgroundColor: filter === category ? "#2563EB" : "#3e4c6bff",
              color: "#fff",
            }}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}

        <div className="d-flex" style={{ marginLeft: "300px" }}>
          <Button color="primary" onClick={toggle}>
            <MdOutlineShoppingCart /> Cart
          </Button>
        </div>
      </div>

      <div className="row g-5">
        {filteredProducts.map((product) => (
          <div key={product._id} className="col-md-6 col-lg-4 col-xl-3">
            <div
              className="product-card"
              onClick={() => handleItemClick(product._id)}
              style={{ cursor: "pointer" }}
            >
              <div className="product-image p-3">
                <img
                  src={product.imgUrl}
                  alt={product.pname}
                  width={200}
                  height={150}
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <div className="category">{product.category}</div>
                <h3 className="product-title">{product.pname}</h3>
                <p className="product-description">{product.pinformation}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="product-price">${product.price}</span>
                  <span className="product-stock">Stock: {product.pstock}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Modal isOpen={modal} toggle={toggle} centered="true" size="lg">
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
              cart.map((item) => (
                <div
                  key={item._id}
                  className="d-flex justify-content-between mb-2"
                >
                  <div>
                    <img
                      src={item.imgUrl}
                      alt={item.pname}
                      className="img-fluid rounded"
                      style={{
                        width: "60px",
                        height: "60px",
                      }}
                    />
                  </div>
                  <span>
                    {item.pname} (x{item.qty})
                  </span>
                  <span>${item.price * item.qty}</span>
                </div>
              ))
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
      </div>
    </div>
  );
};

export default Products;
