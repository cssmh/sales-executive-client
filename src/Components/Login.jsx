import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const [pass, setPass] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation()
  const navigateTo = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      navigateTo(location?.state || "/", { replace: true });
      toast.success("login successful");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await login(email, password);
      toast.success("login successful");
      navigateTo(location?.state || "/", { replace: true });
    } catch (error) {
      console.log(error);
      setError("Failed to login");
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
          <p className="text-gray-600 mt-2">Sign in to continue</p>
        </div>
        <form onSubmit={handleEmailLogin} className="mb-4">
          <div className="mb-4">
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
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type={pass ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
            <span
              className="absolute top-[40px] right-3 text-gray-500 cursor-pointer"
              onClick={() => setPass(!pass)}
            >
              {pass ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-gray-100 text-gray-800 flex items-center justify-center py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
        >
          <FcGoogle className="text-2xl mr-2" />
          Sign in with Google
        </button>
        <p className="text-sm mt-3 text-center dark:text-gray-600">
          Do not have an account?{" "}
          <Link
            state={location.state}
            to={"/register"}
            rel="noopener noreferrer"
            className="underline text-green-600"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
