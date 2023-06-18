import { useState, FormEventHandler } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useLoginMutation } from "../store/api";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useLoginMutation();
  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    console.log("email", email);
    console.log("password", password);
    try {
      await login({ email, password });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Login</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
