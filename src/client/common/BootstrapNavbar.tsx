import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useAppSelector } from "../hooks";
import { useLogoutMutation } from "../store/api";
const BootstrapNavbar = () => {
  const auth = useAppSelector((store) => store.auth);
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Gen-Marketing-Tool</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          {auth.user && auth.user.id && (
            <Nav>
              <Nav.Link>Dashboard</Nav.Link>
              <Nav.Link>Appointments</Nav.Link>
              <Nav.Link>Profiles</Nav.Link>
              <Nav.Link>Campaigns</Nav.Link>
              <Nav.Link>Transmissions</Nav.Link>
              <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BootstrapNavbar;
