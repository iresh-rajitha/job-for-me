import React from "react";
import emailjs from "emailjs-com";

// import "./ContactUs.css";

const Email = (subject, email, body, signature) => {
  var templateParams = {
    subject: subject,
    email: email,
    body: body,
    signature: signature,
  };

  const serviceID = "service_dod96eb";
  const templateID = "template_h8af3yb";
  const userID = "user_EY6nMH0QMSyeSbCdl9Dyi";

  try {
    console.log("Got it");
    emailjs.send(serviceID, templateID, templateParams, userID);
  } catch (error) {
    console.log(error.message);
  }
};

export default Email;

// function sendEmail(e) {
//   e.preventDefault();

//   emailjs
//     .sendForm(
//       "service_dod96eb",
//       "template_h8af3yb",
//       e.target,
//       "user_EY6nMH0QMSyeSbCdl9Dyi"
//     )
//     .then(
//       (result) => {
//         console.log(result.text);
//       },
//       (error) => {
//         console.log(error.text);
//       }
//     );
//   e.target.reset();
// }
