import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        values,
      );
      dispatch(login({ user: res.data.user, token: res.data.token }));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error.res?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
            >
              Log in
            </Button>
          </Form.Item>

          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
