import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const LoginPage = () => {
  const { setUserData } = useContext(AppContext);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (formData.email === "" || formData.password === "") {
        toast.error("Please fill out all fields");
        return;
      }
      if (formData.email.indexOf("@") < 0) {
        toast.error("Invalid email address");
        return;
      }
      if (formData.password.length < 3) {
        toast.error("Password must be at least 3 characters long");
        return;
      }
      const response = await login(formData);
      toast.success("User logged in successfully!");
      setUserData(response.userId);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Error in logging user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Logo or Heading */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h1>

        {/* Form */}
        <form>
          {/* Email/Username Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              onChange={handleInputChange}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              onChange={handleInputChange}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember Me</span>
            </label>
            <a
              onClick={() => alert("Work in progress...")}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 text-center text-gray-500">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
