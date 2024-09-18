// import { useState } from "react";
// import axios from "axios";

const Admin = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/api/orders")
//       .then((response) => {
//         setOrders(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching orders", error);
//       });
//   }, []);

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <h3>All Sales Orders</h3>
      <ul>
        {/* {orders?.map((order, index) => (
          <li key={index}>
            Order {index + 1}: Total Amount = {order.totalAmount}
            <ul>
              {order.products.map((product, i) => (
                <li key={i}>
                  {product.name} - {product.quantity} x {product.price} ={" "}
                  {product.quantity * product.price}
                </li>
              ))}
            </ul>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default Admin;
