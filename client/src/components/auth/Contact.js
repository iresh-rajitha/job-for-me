import React from "react";
// import "./CSS/Contact.css";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";

const Contact = () => {
  const { register, handleSubmit, errors } = useForm();

  const sendFeedback = (serviceID, templateId, userID, variables) => {
    emailjs
      .sendForm(serviceID, templateId, variables, userID)
      .then((res) => {
        console.log("Email successfully sent!");
        console.log(res.message);
      })
      .catch((err) =>
        console.error(
          "There has been an error.  Here some thoughts on the error that occured:",
          err
        )
      );
  };

  const onSubmit = (data, r) => {
    alert(`Thank you for your message from ${data.email}`);
    const templateId = "template_h8af3yb";
    const serviceID = "service_dod96eb";
    const userID = "user_EY6nMH0QMSyeSbCdl9Dyi";

    sendFeedback(serviceID, templateId, userID, {
      from_name: data.name,
      message_html: data.comment,
      reply_to: data.email,
    });
    r.target.reset();
  };

  return (
    <div className="ContactForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="name"
          name="name"
          ref={register({
            required: "Please enter your name",
            maxLength: {
              value: 20,
              message: "Please enter a name with fewer than 20 characters",
            },
          })}
        />
        <br />
        {errors.name && errors.name.message}
        <br />

        <input
          placeholder="email"
          name="email"
          ref={register({
            required: "Please enter an email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        <br />
        {errors.email && errors.email.message}
        <br />

        <textarea
          placeholder="comment"
          name="comment"
          ref={register({
            required: true,
          })}
        />
        <br />
        {errors.comment && "oops, you forgot your message!"}
        <br />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Contact;
