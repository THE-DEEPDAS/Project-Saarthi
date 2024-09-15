"use client";

import { useState } from "react";
import { Button } from "./ui/Button.js";
import { Input } from "./ui/Input.js";
import { Textarea } from "./ui/Textarea.js";
import "./ui/Contact.css";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
} from "lucide-react";
import emailjs from "emailjs-com"; // Import EmailJS

export default function ContactPage() {
  const [hoverStates, setHoverStates] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleHover = (field, isHovering) => {
    setHoverStates((prev) => ({ ...prev, [field]: isHovering }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sending the main email
    emailjs
      .send(
        "your_service_id", // Replace with your service ID
        "your_template_id", // Replace with your template ID for the message
        {
          from_name: formData.name, // Sender's name
          reply_to: formData.email, // Sender's email for reply
          message: formData.message, // Message content
        },
        "your_public_key" // Replace with your EmailJS public key
      )
      .then(() => {
        alert("Message sent successfully!");

        // Sending the acknowledgment email
        emailjs.send(
          "your_service_id", // Same service ID
          "your_autoreply_template_id", // Replace with your template ID for the acknowledgment
          {
            to_email: formData.email, // Recipient email (the sender's email)
            from_name: "Deep", // Your name for acknowledgment
            reply_to: "your_email@example.com", // Your reply email
          },
          "your_public_key" // Same public key
        );
      })
      .catch(() => {
        alert("Failed to send message.");
      });
  };

  return (
    <div className="contact-wrapper">
      <div className="container">
        <div className="contact-wrapper">
          {/* Left Section */}
          <div className="contact-form">
            <h1>Contact Us</h1>
            <p>We're here to help you!</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <Input
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onMouseEnter={() => handleHover("name", true)}
                  onMouseLeave={() => handleHover("name", false)}
                  required
                />
              </div>
              <div className="form-group">
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onMouseEnter={() => handleHover("email", true)}
                  onMouseLeave={() => handleHover("email", false)}
                  required
                />
              </div>
              <div className="form-group">
                <Textarea
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onMouseEnter={() => handleHover("message", true)}
                  onMouseLeave={() => handleHover("message", false)}
                  required
                />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </div>

          {/* Right Section */}
          <div className="contact-info">
            <h2>Reach Out to Us!</h2>
            <p>Got a question? We're here to answer!</p>
            <div className="contact-details">
              <div className="contact-item">
                <MapPinIcon size={24} />
                <span>123 Main St, Anytown, USA 12345</span>
              </div>
              <div className="contact-item">
                <PhoneIcon size={24} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <MailIcon size={24} />
                <span>contact@example.com</span>
              </div>
            </div>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/greatnotes09?igsh=b3h2b3F4b3VyMHVx&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon size={24} />
              </a>
              <TwitterIcon size={24} />
              <LinkedinIcon size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer>
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2023 Your Company. All rights reserved.</p>
            <div>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
