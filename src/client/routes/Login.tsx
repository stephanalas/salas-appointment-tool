import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Login = () => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Login</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
