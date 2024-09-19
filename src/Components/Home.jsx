import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center text-center justify-center min-h-[82vh] bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Welcome to Sales Management
      </h1>
      <p className="text-lg mb-4 text-gray-600">
        Manage your orders, view reports, and keep <br /> track of sales easily.
      </p>
      <button
        onClick={() => navigate("/add-order")}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        Add New Order
      </button>
    </div>
  );
};

export default Home;
