import { useState } from "react";

const AddOrder = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [totalAmount, setTotalAmount] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    });
  };

  const addProduct = () => {
    if (
      currentProduct.name &&
      currentProduct.quantity &&
      currentProduct.price
    ) {
      const newProducts = [...products, currentProduct];
      setProducts(newProducts);

      const newTotal =
        totalAmount +
        parseFloat(currentProduct.price) * parseInt(currentProduct.quantity);
      setTotalAmount(newTotal);

      setCurrentProduct({ name: "", quantity: "", price: "" });
    }
  };

  const submitOrder = () => {
    const order = {
      products,
      totalAmount,
    };
    console.log("Submitting order:", order);
  };

  return (
    <div className="container">
      <h2>Add Sales Order</h2>
      <div>
        <input
          type="text"
          name="name"
          value={currentProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
        />
        <input
          type="number"
          name="quantity"
          value={currentProduct.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
        />
        <input
          type="number"
          name="price"
          value={currentProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <div>
        <h3>Products Added:</h3>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.name} - {product.quantity} x {product.price} ={" "}
              {product.quantity * product.price}
            </li>
          ))}
        </ul>
      </div>
      <h3>Total: {totalAmount}</h3>
      <button onClick={submitOrder}>Submit Order</button>
    </div>
  );
};

export default AddOrder;
