import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Register = () => {
  const { createUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setError(null);
      await createUser(email, password);
      toast.success("Register successful");
    } catch (error) {
      console.error("Error creating account: ", error);
      setError("Failed to create an account. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800">Register</h1>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
            />
          </div>
          <div className="h-3 mb-3">
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg shadow-md last:transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-sm mt-3 text-center dark:text-gray-600">
          Already have account{" "}
          <Link
            state={location.state}
            to={"/login"}
            rel="noopener noreferrer"
            className="underline text-green-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
