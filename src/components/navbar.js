import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token_key = "USER_TOKEN";

function NavbarNew() {
  const getToken = () => {
    let token = window.localStorage.getItem(token_key);
    return token || false;
  }

  let token = getToken();
  const [isLogin, setIsLogin] = useState(token ? true : false);

  const logout = async (e) => {
    e.preventDefault();
    if (!token) {
      window.location.replace('/login');
    }

    if (token) {
      try {
        await axios.get(`https://darkestwhitebackend.lcnitd.co.in/user/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsLogin(false);
        window.localStorage.clear();
        toast.success("Logged out successfully.")
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar" sticky="top">
      <Container>
        <Navbar.Brand className="navbar-title">
          <Link to="/" style={{ textDecoration: "none", color: "#fff", fontWeight: "bold", fontSize: "1.5rem" }}>
            TrekTales.com
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto navbar-content">
            <Nav.Link as={Link} to="/" className="nav-link">HOME</Nav.Link>
            <Nav.Link as={Link} to="/posts" className="nav-link">POSTS</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link">CONTACT US</Nav.Link>
            <Nav.Link as={Link} to="/create" className="nav-link">{isLogin ? "CREATE POST" : ""}</Nav.Link>
            <Nav.Link
              as={Link}
              to="/login"
              className={`nav-link ${isLogin ? 'login-button' : ''}`}
              onClick={logout}
              style={{
                color: isLogin ? '#fff' : '#007bff',
                backgroundColor: isLogin ? '#007bff' : 'transparent',
                padding: '10px 20px',
                borderRadius: '25px',
                textDecoration: 'none',
                margin: '0 15px',
                fontSize: '1.2rem',
                transition: 'background-color 0.3s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              {isLogin ? "LOGOUT" : "LOGIN"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarNew;
