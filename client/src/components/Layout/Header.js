import React from "react";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
// import Dashboard from "./../../pages/user/Dashboard";
// import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
// import { useWish } from "../../context/favorite";
import { Badge } from "antd";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { BsBorderWidth } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { FaUser } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { FcShop } from "react-icons/fc";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();
  const navigate = useNavigate();
  // const [wish] = useWish();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    // localStorage.removeItem("auth");
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <NavLink to="/">
            <FcShop size={25} className="me-2" />
          </NavLink>
          <Navbar.Brand>GreenGrocer</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/categories">
                All Categories
              </Nav.Link>
              <NavDropdown title="Categories" id="collasible-nav-dropdown">
                {categories.map((c, index) => (
                  <NavDropdown.Item
                    key={index}
                    as={NavLink}
                    to={`/category/${c.slug}`}
                  >
                    <span className="text-light me-2 category-basket">
                      <SlBasket />
                    </span>
                    {c.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>{" "}
              <Nav.Link as={NavLink} to="/search ">
                Search
              </Nav.Link>
            </Nav>

            <Nav>
              {!auth.user ? (
                <>
                  <Nav.Link as={NavLink} to="/register">
                    Register
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                </>
              ) : (
                <>
                  <NavDropdown
                    title={
                      <>
                        <FaUser
                          style={{ marginRight: "5px", marginBottom: "2px" }}
                        />{" "}
                        {/* add icon */}
                        {auth.user.name.charAt(0).toUpperCase() +
                          auth.user.name.slice(1)}
                      </>
                    }
                    id="collasible-nav-dropdown"
                    size="sm"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    <NavDropdown.Item
                      as={NavLink}
                      to={`/dashboard/${
                        auth.user.role === 1 ? "admin" : "user"
                      }/${auth.user.role === 1 ? "chart" : "orders"}`}
                    >
                      <BsBorderWidth />
                      &nbsp;{" "}
                      {`${auth.user.role === 1 ? "Dashborad" : "Orders"}`}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      to={`/dashboard/${
                        auth.user.role === 1 ? "admin" : "user"
                      }/${auth.user.role === 1 ? "profile" : "userinfo"}`}
                    >
                      {" "}
                      <FaUserCircle />
                      &nbsp; {`${auth.user.role === 1 ? "Profile" : "Profile"}`}
                    </NavDropdown.Item>{" "}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      <IoLogOut />
                      &nbsp; logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr style={{ margin: 0 }} />

      {cart.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
          }}
        >
          <NavLink to="/cart">
            <FaShoppingCart
              size={27}
              style={{
                marginRight: "10px",
                color: "#51af1d",
                verticalAlign: "middle",
              }}
            />
            <Badge
              count={cart?.length}
              style={{
                backgroundColor: "#0b1904",
                marginBottom: "1.5rem",
                marginLeft: "-.5rem",
                boxShadow: "none",
              }}
            ></Badge>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Header;
