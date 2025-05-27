import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { login, getToken } from "../../api";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) navigate("/");
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      await login(values.username, values.password);
      notification.success({ message: "Logged in" });
      navigate("/");
    } catch {
      notification.error({ message: "Wrong username or password" });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: "10vh" }}>
      <h1>Login</h1>
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
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" onClick={() => navigate("/register")} block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}