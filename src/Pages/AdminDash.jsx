import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { deleteOrder, getAllOrders } from "../Api/Order";
import SmallLoader from "../Components/SmallLoader";

const AdminDash = () => {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => await getAllOrders(),
  });

  const handleDelete = async (id) => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Once deleted, it can't be recovered!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (willDelete) {
        await deleteOrder(id);
        refetch(); // Refresh the list after deletion
        swal("Order deleted!", {
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Failed to delete order:", error);
      swal("Error", "Failed to delete order. Please try again.", "error");
    }
  };

  if (isLoading) return <SmallLoader size={78} />;

  return (
    <div className="max-w-[1200px] mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
      {data.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-1">Order ID</th>
                <th className="border p-2">Products</th>
                <th className="border p-2">Total Amount</th>
                <th className="border p-2">Sales Executive</th>
                <th className="border p-2">Shop Details</th>
                <th className="border p-2">Signature</th>
                <th className="border p-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => (
                <tr key={index}>
                  <td className="border p-1">{order._id.slice(0, 17)}..</td>
                  <td className="border p-2">
                    <ul className="list-disc pl-5">
                      {order.products.map((product, i) => (
                        <li key={i}>
                          {product.name} - {product.quantity} x {product.price}{" "}
                          taka
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border p-2">{order.totalAmount} Taka</td>
                  <td className="border p-2">
                    {order.salesExecutive.name} ({order.salesExecutive.number})
                  </td>
                  <td className="border p-2">
                    Name: {order.shopDetails.ownerName} <br />
                    Address: {order.shopDetails.address} <br />
                    Phone: {order.shopDetails.phoneNumber}
                  </td>
                  <td className="border p-2">
                    {order.signature && (
                      <img
                        src={order.signature}
                        alt="Signature"
                        className="w-32 h-auto"
                      />
                    )}
                  </td>
                  <td className="border p-1 text-center">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDash;
