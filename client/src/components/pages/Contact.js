import React, { useState } from "react";
import "./Contact.css";
import contact from "../../images/ContactBanner.gif";
import send from "../../images/Send_Mail.gif";
import axios from "axios";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [banner, setBanner] = useState("");
  const [bool, setBool] = useState(false);
  const [showButton, setShowButton] = useState(true);

  //handle input
  const handleNameChange = (e) => {
    setName(e.target.value);
    // console.log(name);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // console.log(email);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    // console.log(message);
  };

  //form submit

  const formSubmit = (e) => {
    e.preventDefault();

    let data = {
      name,
      email,
      message,
    };

    setBool(true);

    axios
      .post(`/contact`, data)
      .then((res) => {
        setBanner(res.data.msg);
        setBool(false);

        setTimeout(() => {
          setBanner("");
        }, 2000);

        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  };

  //button
  const onClickSend = () => {

    // setShowButton(false);

    setTimeout(() => {
      setShowButton(false);
    }, 100);

    <div className="">
       {showButton ?null  : <button type="submit" onClick={onClickSend}>
                  {/* <i className="fa fa-paper-plane"></i> */}
                  Send
                </button>}
    </div>
  //     {/* <i className="fa fa-paper-plane"></i> */}

    setTimeout(() => {
      setShowButton(true)
    }, 5000);
  };

  return (
    <div className="main-container" id="Contact">
      <div className="contactForm">
        <h1 className="title">Contact</h1>

        <div className="contactFrom-center">
          <div className="contact_form">
            <form onSubmit={formSubmit}>
              <p>{banner}</p>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                value={name}
                onChange={handleNameChange}
              />

              <label htmlFor="email">Email: </label>
              <input
                type="email"
                placeholder="Enter your mail ID"
                required
                value={email}
                onChange={handleEmailChange}
              />

              <label htmlFor="message">Message: </label>
              <textarea
                name="message"
                id=""
                cols="20"
                rows="7"
                placeholder="Enter your message"
                value={message}
                onChange={handleMessageChange}
              />

              <div className="sent-btn" onClick={onClickSend}>
                {showButton && <button type="submit">Send</button>}

                {/* <i className="fa fa-paper-plane"></i> */}
              </div>

              <div style={{ textAlign: "center", margin: "10px" }}>
                {bool ? (
                  <b className="load">
                    <img
                      src={send}
                      alt=""
                      style={{ width: "100px", height: "100px" }}
                    />
                  </b>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>

          {/* contact-inf */}

          <div className="contact-info">
            <h2>Send Me message</h2>
            <img src={contact} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
