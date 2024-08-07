import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Email = ({ user }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  console.log(user);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-z0-9][\w\.]+\@\w+?(\.\w+){1,}$/gi;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Invalid email address!");
      return;
    }
    if (!message) {
      toast.error("Need to enter a message!");
      return;
    }

    const serviceId = "service_f13zsth";
    const templateId = "template_uf224ja";
    const publicKey = "P1sl9CduU8XLl-bwe";

    const templateParams = {
      from_name: user.name,
      from_email: user.email,
      to_email: email,
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        toast.success("Email sent successfully!");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        toast.error("Email failed to send!");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="user_email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          name="message"
          value={message}
          placeholder="Enter your message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default Email;
