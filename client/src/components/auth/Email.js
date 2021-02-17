import React from "react";
import emailjs from "emailjs-com";

// import "./ContactUs.css";

export default function ContactUs() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dod96eb",
        "template_h8af3yb",
        e.target,
        "user_EY6nMH0QMSyeSbCdl9Dyi"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    var templateParams = {
      name: "James",
      notes: "Check this out!",
    };

    emailjs.send(
      "service_dod96eb",
      "template_h8af3yb",
      templateParams,
      "user_EY6nMH0QMSyeSbCdl9Dyi"
    );

    e.target.reset();
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}
