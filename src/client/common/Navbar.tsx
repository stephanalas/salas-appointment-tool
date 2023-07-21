import React from "react";
import { useAppSelector } from "../hooks";
import { useLogoutMutation } from "../store/api";
import { useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const BootstrapNavbar = () => {
  const auth = useAppSelector((store) => store.auth);
  const [logout] = useLogoutMutation();
  const { breakpoints } = useTheme();
  const navigate = useNavigate();
  // const matches = useMediaQuery(breakpoints);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = [
    "Dashboard",
    "Tasks",
    "Profiles",
    "Appointments",
    "Campaigns",
    "Transmissions",
    "Log out",
  ];

  const handleNavItems = async (navItem: string) => {
    try {
      switch (navItem) {
        case "Log out":
          await logout().unwrap();
          break;
        case "Dashboard":
          navigate("/");
          break;
        default:
          navigate(navItem.toLowerCase());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {auth.user && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                sx={{
                  mr: 2,
                  display: { xs: "block", sm: "none" },
                }}
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {auth.user &&
                pages.map((item) => (
                  <MenuItem
                    key={item}
                    onClick={() => {
                      handleNavItems(item);
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography>{item}</Typography>
                  </MenuItem>
                ))}
            </Menu>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "block" } }}
            >
              gen-marketing-tool
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {auth.user &&
                pages.map((item) => {
                  return (
                    <Button
                      key={item}
                      sx={{ color: "#fff" }}
                      onClick={() => handleNavItems(item)}
                    >
                      {item}
                    </Button>
                  );
                })}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
    // <Navbar expand="lg" className="bg-body-tertiary">
    //   <Container>
    //     <Navbar.Brand href="/">Gen-Marketing-Tool</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="navbar" />
    //     <Navbar.Collapse id="navbar">
    //       {auth.user && auth.user.id && (
    //         <Nav>
    //           <Nav.Link>Dashboard</Nav.Link>
    //           <Nav.Link>Appointments</Nav.Link>
    //           <Nav.Link>Profiles</Nav.Link>
    //           <Nav.Link>Campaigns</Nav.Link>
    //           <Nav.Link>Transmissions</Nav.Link>
    //           <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
    //         </Nav>
    //       )}
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

export default BootstrapNavbar;
