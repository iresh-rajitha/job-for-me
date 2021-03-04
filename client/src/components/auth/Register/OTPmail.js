import axois from "axios";

export const sendOTPmail = (email, name) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  let formData = new FormData();

  formData.append("ToEmail", email);
  formData.append("UserName", name);

  axois.post("https://localhost:5001/api/mail/welcome", formData, config);
};
