import toast from "react-hot-toast";
import swal from "sweetalert";
import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import useAuth from "../hooks/useAuth";
import { postOrder } from "../Api/Order";

const AddOrder = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [salesExecutive, setSalesExecutive] = useState({
    name: "",
    number: "",
  });
  const [shopDetails, setShopDetails] = useState({
    address: "",
    ownerName: "",
    phoneNumber: "",
  });
  const [signature, setSignature] = useState(null);
  const signatureRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSalesExeChange = (e) => {
    const { name, value } = e.target;
    setSalesExecutive((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShopDetailsChange = (e) => {
    const { name, value } = e.target;
    setShopDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addProduct = () => {
    if (
      currentProduct.name &&
      currentProduct.quantity &&
      currentProduct.price
    ) {
      const quantity = parseInt(currentProduct.quantity);
      const price = parseFloat(currentProduct.price);
      setProducts((prev) => [...prev, currentProduct]);
      setTotalAmount((prev) => prev + price * quantity);
      setCurrentProduct({ name: "", quantity: "", price: "" });
      toast.success("Product added successfully!");
    } else {
      toast.error("Please fill all the fields!");
    }
  };

  const deleteProduct = (index) => {
    setProducts((prev) => {
      const newProducts = prev.filter((_, i) => i !== index);
      const newTotalAmount = newProducts.reduce((acc, product) => {
        return acc + parseFloat(product.price) * parseInt(product.quantity);
      }, 0);
      setTotalAmount(newTotalAmount);
      return newProducts;
    });
  };

  const clearSignature = () => {
    signatureRef.current.clear();
    setSignature(null);
  };

  const clearAllFields = () => {
    setProducts([]);
    setTotalAmount(0);
    setCurrentProduct({ name: "", quantity: "", price: "" });
    setSalesExecutive({ name: "", number: "" });
    setShopDetails({ address: "", ownerName: "", phoneNumber: "" });
    clearSignature();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (products.length === 0) {
      return toast.error("Please add at least one product!");
    }

    // if (!/^(\+?8801|01)(\d{9})$/.test(salesExecutive.number)) {
    //   toast.error("Enter a valid Sales Executive phone number!");
    //   return;
    // }

    // if (!/^(\+?8801|01)(\d{9})$/.test(shopDetails.phoneNumber)) {
    //   toast.error("Enter a valid Shop phone number!");
    //   return;
    // }

    if (!signature) {
      return toast.error("Please provide a signature!");
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      const order = {
        seller: user?.email,
        products,
        totalAmount,
        salesExecutive,
        shopDetails,
        signature: signatureRef.current.toDataURL(),
      };

      await postOrder(order);
      swal("Good job!", "Order submitted successfully!", "success", {
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit order!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Sales Order</h2>
      <form onSubmit={handleSubmit}>
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
            type="button"
            onClick={addProduct}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
          >
            Add Product
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Products Added:</h3>
          <ul className="list-disc space-y-2">
            {products.map((product, index) => (
              <li
                key={index}
                className="flex justify-between bg-gray-100 p-2 rounded-md"
              >
                <span>{product.name}</span>
                <span>
                  {product.quantity} x {product.price} =
                  {product.quantity * product.price} taka
                </span>
                <button
                  type="button"
                  onClick={() => deleteProduct(index)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <h3 className="text-xl font-semibold mb-4">
          Total: {totalAmount} Taka
        </h3>
        <div className="mb-2">
          <input
            type="text"
            name="name"
            required
            value={salesExecutive.name}
            onChange={handleSalesExeChange}
            placeholder="Sales Executive Name"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="text"
            name="number"
            required
            value={salesExecutive.number}
            onChange={handleSalesExeChange}
            placeholder="Sales Executive Number"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">Shop Information</h3>
        <div className="mb-4">
          <input
            type="text"
            name="address"
            required
            value={shopDetails.address}
            onChange={handleShopDetailsChange}
            placeholder="Shop Address"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="text"
            name="ownerName"
            required
            value={shopDetails.ownerName}
            onChange={handleShopDetailsChange}
            placeholder="Shop Owner Name"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="text"
            name="phoneNumber"
            required
            value={shopDetails.phoneNumber}
            onChange={handleShopDetailsChange}
            placeholder="Shop Phone Number"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Signature:</h3>
          <SignatureCanvas
            ref={signatureRef}
            penColor="black"
            canvasProps={{ className: "border border-gray-300 w-full h-40" }}
            onEnd={() => setSignature(signatureRef.current.toDataURL())}
          />
          <div className="flex justify-between mt-2">
            <button
              type="button"
              onClick={clearSignature}
              className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Clear Signature
            </button>
            <div className="space-x-2">
              <button
                type="button"
                onClick={clearAllFields}
                className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Clear data
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Print
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default AddOrder;
