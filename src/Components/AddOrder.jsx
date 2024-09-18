import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.success("Product added successfully!");
    } else {
      toast.error("Please fill all the fields!");
    }
  };

  const submitOrder = () => {
    const order = {
      products,
      totalAmount,
    };
    console.log("Submitting order:", order);
    toast.success("Order submitted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Sales Order</h2>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={currentProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <input
          type="number"
          name="quantity"
          value={currentProduct.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <input
          type="number"
          name="price"
          value={currentProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={addProduct}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Product
        </button>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Products Added:</h3>
        <ul className="list-disc pl-5 space-y-2">
          {products.map((product, index) => (
            <li
              key={index}
              className="flex justify-between bg-gray-100 p-2 rounded-md"
            >
              <span>{product.name}</span>
              <span>
                {product.quantity} x ${product.price} = $
                {product.quantity * product.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <h3 className="text-xl font-semibold mb-4">
        Total: ${totalAmount.toFixed(2)}
      </h3>
      <button
        onClick={submitOrder}
        className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        Submit Order
      </button>
      <ToastContainer />
    </div>
  );
};

export default AddOrder;
