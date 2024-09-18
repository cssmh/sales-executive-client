import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../Api/Order";
import useAuth from "../hooks/useAuth";
import SmallLoader from "../Components/SmallLoader";

const MyOrders = () => {
  const { user, loading } = useAuth();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders"],
    enabled: !loading && !!user?.email,
    queryFn: async () => await getMyOrders(user?.email),
  });

  if (isLoading || loading) return <SmallLoader size={78} />;

  return (
    <div className="max-w-[1200px] mx-auto mt-8">
      {orders.length === 0 ? (
        <div className="flex justify-center items-center text-red-600 h-[70vh]">
          No orders found!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-50 shadow-md rounded-lg p-4 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Order #{order._id}
                </h2>
              </div>
              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  Products
                </h3>
                <ul className="list-disc pl-5">
                  {order.products.map((product, i) => (
                    <li key={i} className="text-gray-600">
                      {product.name} - {product.quantity} x {product.price} taka
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-600 mb-2">
                Total Amount: {order.totalAmount} Taka
              </p>
              <p className="text-gray-600 mb-2">
                Sales Executive: {order.salesExecutive.name} (
                {order.salesExecutive.number})
              </p>
              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  Shop Details
                </h3>
                <p className="text-gray-600">
                  Name: {order.shopDetails.ownerName} <br />
                  Address: {order.shopDetails.address} <br />
                  Phone: {order.shopDetails.phoneNumber}
                </p>
              </div>
              {order.signature && (
                <div className="mb-4">
                  <h3 className="text-md font-semibold text-gray-700 mb-2">
                    Signature
                  </h3>
                  <img
                    src={order.signature}
                    alt="Signature"
                    className="w-32 h-auto"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
