import { useState, FormEventHandler } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useLoginMutation } from "../store/api";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCredentials } from "../store/slices/authSlice";
import { Navigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    console.log("hey");
    try {
      const auth = await login({ email, password }).unwrap();
      if (auth.user) {
        //TODO
        dispatch(setCredentials({ user: auth.user }));
        // we got the user, save user to the store and navigate to dashboard page
      }
    } catch (error) {
      console.log(error);
    }
  };
  return user ? (
    <Navigate to="/" />
  ) : (
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
