import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { googleLogin } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
          <p className="text-gray-600 mt-2">Sign in to continue</p>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-blue-500 text-white flex items-center justify-center py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          <FcGoogle className="text-2xl mr-2" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
