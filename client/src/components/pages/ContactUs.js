import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import sendEmail from "./Email";

const ContactUs = () => {
  const [formData, setFromData] = useState({
    subject: "",
    email: "",
    body: "",
    signature: "",
  });

  const { subject, email, body, signature } = formData;

  const onChange = (e) =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    sendEmail(subject, email, body, signature);
  };

  return (
    <section className="container">
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        {/* <form className="form" onSubmit={MyComponent}> */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            value={subject}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-groud">
          <input
            type="text"
            placeholder="Enter your Message Body"
            name="body"
            value={body}
            onChange={(e) => onChange(e)}
            minLength="3"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Signature"
            name="signature"
            value={signature}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Send" />
      </form>
    </section>
  );
};

export default ContactUs;
