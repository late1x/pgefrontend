import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const initialProduct = { id: 0, name: '', price: '', brand: '', supplier: '', quantity: 0 };

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(initialProduct);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://walrus-app-6rnot.ondigitalocean.app/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editMode) {
        await axios.put(`https://walrus-app-6rnot.ondigitalocean.app/products/${product.id}`, product);
      } else {
        await axios.post('https://walrus-app-6rnot.ondigitalocean.app/products', product);
      }

      setProduct(initialProduct);
      setEditMode(false);
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    setProduct(product);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://walrus-app-6rnot.ondigitalocean.app/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Agregar Producto
      </Button>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Marca</th>
            <th>Proveedor</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.brand}</td>
              <td>{product.supplier}</td>
              <td>{product.quantity}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(product)}>
                  Editar
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(product.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? 'Editar Producto' : 'Agregar Producto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProductName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductBrand">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductSupplier">
              <Form.Label>Proveedor</Form.Label>
              <Form.Control
                type="text"
                name="supplier"
                value={product.supplier}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductQuantity">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editMode ? 'Actualizar' : 'Agregar'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
