import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { register, getToken } from "../../api";
import { useEffect } from "react";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) navigate("/");
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      await register(values.username, values.password);
      notification.success({ message: "Registration successful! Please log in." });
      navigate("/login");
    } catch {
      notification.error({ message: "Registration failed." });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: "10vh" }}>
      <h1>Register</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }, { min: 6, message: "Password must be at least 6 characters." }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" onClick={() => navigate("/login")} block>
            Back to Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}