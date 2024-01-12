import "../App.css";
import { FaInstagram, FaFacebook, FaGlobe } from "react-icons/fa";
import NavbarNew from "./navbar";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Footer from "./footer";
import ScrollArrow from "./scrollbutton";
import { useState } from "react";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";

function Contact() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name && email && message){
      if(!isValidEmail(email)) {
        toast.error("Please input a valid email.");
        return;
      }
      await axios
      .post(`https://darkestwhitebackend.lcnitd.co.in/message`, {
        name: name,
        email: email,
        message:message,
      })
      .then((res) => {
        toast.success("Submitted, thank you!");
      })

      .catch((err) => console.log(err));
    }
    else{
      toast.error("Please fill out all fields.");
    }
  };

  let newDate = new Date();
  let date = newDate.getDate();
  let year = newDate.getFullYear();
  let monthNumber = new Date().getMonth();
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthName = monthNames[monthNumber];
  return (
    <div>
      <NavbarNew />
      <div className="contact-hero">
        <div>
          <h1 className="contact-header">Yours Truly</h1>
          <hr style={{ color: "white" }} className="contact-line" />
          <img
            className="team"
            src={require("../pic.jpeg")}
            alt={"Darkest White"}
          />
          <hr style={{ color: "white" }} className="contact-line" />
          <p className="intro">
            
Embarking on treks fuels my soul with a profound 
sense of adventure and discovery. I am a social butterfly, 
drawn to the camaraderie of fellow trekkers and the diverse 
stories each trail unveils. My ambition propels me to conquer new heights,
 both metaphorical and literal. Friendly by nature, I cherish forming 
connections on the path less traveled, making every
 journey an enriching experience.
            <br />
            To know more about me, visit:
            <br />
            <br />
            <Row>
              <Col>
                <a
                  href="https://www.facebook.com/lcnitdgp"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <FaFacebook />
                </a>
              </Col>
              <Col>
                <a
                  href="https://www.instagram.com/divyanshchaudharyy/"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <FaInstagram />
                </a>
              </Col>
              <Col>
                <a
                  href="https://divyanshchaudharyyy.netlify.app/"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <FaGlobe />
                </a>
              </Col>
            </Row>
          </p>
          <hr style={{ color: "white" }} className="contact-line" />
        </div>
        <div>
        <form>
          <Container style={{ backgroundColor: "black" }}>
            <Row>
              <Col lg={6}>
                <h4 className="date" style={{ paddingLeft: "2rem" }}>
                  {date} {monthName} {year}
                </h4>
                <h1 className="message">Send me a message</h1>
                <form style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                  <textArea
                    className="textarea"
                    placeholder="Type Your Message Here.."
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    value={message}
                    required
                  ></textArea>
                  <Col className="form-area">
                    <input
                      type="email"
                      placeholder="Email"
                      style={{
                        outline: "none",
                        marginBottom: "2rem",
                        paddingLeft: "0.5rem",
                        width: "100%",
                      }}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                      required
                    ></input>
                    <input
                      type="text"
                      placeholder="Name"
                      style={{
                        outline: "none",
                        marginBottom: "2rem",
                        paddingLeft: "0.5rem",
                        width: "100%",
                      }}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                      required
                    ></input>
                  </Col>
                  <Button
                    variant="outline-light"
                    style={{
                      borderRadius: "0%",
                      width: "100%",
                      marginBottom: "2rem",
                      padding: "0.5em 1em 0.5em 1em",
                      background: "#dfdccf",
                      borderColor: "#dfdccf",
                      color: "black"
                    }}
                    onClick={handleSubmit}
                  >
                    SUBMIT
                  </Button>{" "}
                  <ToastContainer />
                </form>
              </Col>
              <Col lg={6}>
                <img
                  className="book"
                  src={require("../Contact-page2-png.png")}
                  alt={"book"}
                />
              </Col>
            </Row>
          </Container>
          </form>
        </div>
      
      </div>
      <Footer />
      <ScrollArrow />
    </div>
  );
}

export default Contact;
