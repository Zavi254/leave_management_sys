import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../features/authSlice";
import { useDispatch } from "react-redux";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const resultAction = await dispatch(signupUser(values));
      if (signupUser.fulfilled.match(resultAction)) {
        navigate("/booking");
      }
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>
        <Form
          name="signup-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <Form.Item
            name="Team"
            rules={[{ required: true, message: "Please input your Team!" }]}
          >
            <Input
              placeholder="Team"
              className="w-full px-3 py-2 border rounded-md"
            />
          </Form.Item>

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
              Sign up
            </Button>
          </Form.Item>

          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
