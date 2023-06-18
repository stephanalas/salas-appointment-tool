import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useAppSelector } from "../utils/hooks";
const BootstrapNavbar = () => {
  const auth = useAppSelector((store) => store.auth);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Gen-Marketing-Tool</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          {auth.id && (
            <Nav>
              <Nav.Link>Dashboard</Nav.Link>
              <Nav.Link>Appointments</Nav.Link>
              <Nav.Link>Profiles</Nav.Link>
              <Nav.Link>Campaigns</Nav.Link>
              <Nav.Link>Transmissions</Nav.Link>
              <Nav.Link>Log out</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BootstrapNavbar;
