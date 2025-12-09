import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Alert,
} from "reactstrap";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
} from "../features/ProductSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const message = useSelector((state) => state.products.message);
  const isLoading = useSelector((state) => state.products.isLoading);

  const [modal, setModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchValue, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [pcode, setPcode] = useState(0);
  const [pname, setPname] = useState("");
  const [category, setCategory] = useState("");
  const [pinformation, setPinformation] = useState("");
  const [pstock, setPstock] = useState(0);
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [inStock, setInStock] = useState(true);

  const [condition, setCondition] = useState("new");

  const [show, setShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const onClose = () => setShow(false);

  useEffect(() => {
    dispatch(getProducts());
    if (message) {
      setAlertMsg(message);
      setShow(true);
    }
  }, [dispatch, message]);

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

  const filteredProducts = products.filter((p) => {
    const s = searchValue.toLowerCase();
    const matchSearch = p.pname.toLowerCase().includes(s);
    const matchCategory =
      categoryFilter === "All" || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      setEditMode(false);
      setSelectedProduct(null);

      setPcode(0);
      setPname("");
      setCategory("");
      setPinformation("");
      setPstock(0);
      setPrice("");
      setImgUrl("");
      setInStock(true);
      setCondition("new");
    }
  };

  const handleEdit = (p) => {
    setEditMode(true);
    setSelectedProduct(p);

    setPcode(p.pcode);
    setPname(p.pname);
    setCategory(p.category);
    setPinformation(p.pinformation);
    setPstock(p.pstock);
    setPrice(p.price);
    setImgUrl(p.imgUrl);
    setInStock(p.inStock);
    setCondition(p.condition || "new");

    setModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalPrice =
      condition === "used" ? Number(price) * 0.9 : Number(price);

    const productData = {
      pname,
      category,
      pinformation,
      pstock,
      price: finalPrice,
      imgUrl,
      inStock,
    };

    if (editMode && selectedProduct) {
      dispatch(
        updateProduct({
          id: selectedProduct._id,
          productData,
        })
      );
    } else {
      dispatch(saveProduct(productData));
    }

    toggleModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center mt-5 mb-5">
      <Alert
        color="success"
        isOpen={show}
        fade={true}
        toggle={onClose}
        style={{
          position: "fixed",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          minWidth: "250px",
          textAlign: "center",
        }}
      >
        {alertMsg}
      </Alert>

      <Container
        style={{ backgroundColor: "#0F172A", padding: 40, borderRadius: 15 }}
      >
        <Row className="align-items-center mb-4">
          <Col xs={6}>
            <h1 className="mb-0">Product Management</h1>
          </Col>
          <Col xs={6} className="text-end">
            <Button color="primary" onClick={toggleModal}>
              <FaPlus className="me-2" /> Add Product
            </Button>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={8}>
            <InputGroup>
              <InputGroupText>
                <FaSearch />
              </InputGroupText>
              <Input
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearch(e.target.value)}
                style={{ backgroundColor: "#c1cbdaff" }}
              />
            </InputGroup>
          </Col>
          <Col xs={4}>
            <Input
              type="select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ backgroundColor: "#c1cbdaff" }}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Input>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table responsive borderless className="table-dark ">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={p.imgUrl}
                        alt={p.pname}
                        className="img-thumbnail"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                      />
                    </td>
                    <td className="align-middle">{p.pname}</td>
                    <td className="align-middle">{p.category}</td>
                    <td className="align-middle">${p.price}</td>
                    <td className="align-middle">
                      <Button
                        style={{ backgroundColor: "#c1cbdaff" }}
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(p)}
                      >
                        <FaEdit color="#0F172A" />
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(p._id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Modal isOpen={modal} toggle={toggleModal} size="lg">
          <ModalHeader toggle={toggleModal}>
            {editMode ? "Edit Product" : "Add Product"}
          </ModalHeader>

          <Form onSubmit={handleSubmit}>
            <ModalBody>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  value={pname}
                  onChange={(e) => setPname(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Category</Label>
                <Input
                  type="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label>Information</Label>
                <Input
                  value={pinformation}
                  onChange={(e) => setPinformation(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Stock Quantity</Label>
                <Input
                  type="number"
                  value={pstock}
                  onChange={(e) => setPstock(Number(e.target.value))}
                />
              </FormGroup>

              <FormGroup>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Image URL</Label>
                <Input
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                />
              </FormGroup>

              <FormGroup check>
                <Input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                />
                <Label check>In Stock</Label>
              </FormGroup>

              <hr />

              <FormGroup check>
                <Input
                  type="radio"
                  name="condition"
                  value="new"
                  checked={condition === "new"}
                  onChange={(e) => setCondition(e.target.value)}
                />

                <Label check>New</Label>
              </FormGroup>

              <FormGroup check>
                <Input
                  type="radio"
                  name="condition"
                  value="used"
                  checked={condition === "used"}
                  onChange={(e) => setCondition(e.target.value)}
                />

                <Label check>Used (10% discount)</Label>
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                {editMode ? "Update" : "Add"}
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminDashboard;
