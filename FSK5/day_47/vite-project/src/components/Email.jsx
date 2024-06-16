import { useRef } from "react";
import emailjs from "@emailjs/browser";

const Email = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_f13zsth", "template_uf224ja", form.current, {
        publicKey: "P1sl9CduU8XLl-bwe",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          e.target.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <input type="email" name="user_email" placeholder="Enter your email..." />
      <textarea name="message" placeholder="Enter your message..." />
      <button type="submit" className="send-btn">
        Send
      </button>
    </form>
  );
};

export default Email;
