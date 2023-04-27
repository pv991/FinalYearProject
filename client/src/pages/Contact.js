import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Layout from "./../components/Layout/Layout";
import { toast } from "react-toastify";
const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_u41mtec",
        "template_d4rinz7",
        form.current,
        "-GwzXN9V-hB5-F-rM"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Your response is received");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <Layout title={"Contact Us"}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="my-5">Contact Us</h1>
            <form ref={form} onSubmit={sendEmail}>
              <div className="form-group">
                <label htmlFor="from_name">Name</label>
                <input
                  type="text"
                  name="from_name"
                  className="form-control"
                  id="from_name"
                  placeholder="Your Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="user_email">Email</label>
                <input
                  type="email"
                  name="user_email"
                  className="form-control"
                  placeholder="Email Id for contact "
                  id="user_email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  className="form-control h-100"
                  id="message"
                  rows="4"
                  placeholder="Your Message"
                />
              </div>
              <button type="submit" className="btn btn-primary ">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
