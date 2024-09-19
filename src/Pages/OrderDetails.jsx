import { useLoaderData } from "react-router-dom";

const OrderDetails = () => {
  const order = useLoaderData();
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Order Details (Order ID: {order._id})
      </h2>
      <div className="border-t border-gray-300 pt-4">
        <p className="text-lg font-medium mb-2">
          <span className="font-bold">Seller: </span>
          {order.salesExecutive.name}
        </p>
        <p className="text-lg mb-2">
          <span className="font-bold">Phone: </span>
          {order.salesExecutive.number}
        </p>
        <p className="text-lg mb-4">
          <span className="font-bold">Total Amount: </span>
          {order.totalAmount} Taka
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-3">Shop Details</h3>
          <p className="text-lg mb-2">
            <span className="font-bold">Owner Name: </span>
            {order.shopDetails.ownerName}
          </p>
          <p className="text-lg mb-2">
            <span className="font-bold">Shop Address: </span>
            {order.shopDetails.address}
          </p>
          <p className="text-lg mb-4">
            <span className="font-bold">Phone Number: </span>
            {order.shopDetails.phoneNumber}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Products Ordered</h3>
          <table className="w-full border-collapse bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left border">#</th>
                <th className="px-4 py-3 text-left border">Product Name</th>
                <th className="px-4 py-3 text-left border">Quantity</th>
                <th className="px-4 py-3 text-left border">Unit Price</th>
                <th className="px-4 py-3 text-left border">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">{product.quantity}</td>
                  <td className="px-4 py-2 border">{product.price} Taka</td>
                  <td className="px-4 py-2 border">
                    {product.quantity * product.price} Taka
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <h3 className="text-xl font-semibold text-right">
            Total: {order.totalAmount} Taka
          </h3>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
