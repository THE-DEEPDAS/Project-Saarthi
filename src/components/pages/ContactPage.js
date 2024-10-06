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
import emailjs from "emailjs-com";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    subject: "",
    message: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_1dvn70q", 
        "template_rz371oi", 
        {
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone,
          order_number: formData.orderNumber,
          subject: formData.subject,
          message: formData.message,
        },
        "Il4-DiKyN8X8ugRKf" 
      )
      .then(() => {
        setShowPopup(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          orderNumber: "",
          subject: "",
          message: "",
        });
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
            <p>We're here to help with your book-related inquiries!</p>
            <form onSubmit={handleSubmit}>
              <div className="cform-group">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  className="contact-input"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="cform-group">
                <label htmlFor="email">Email (optional)</label>
                <Input
                  id="email"
                  className="contact-input"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="cform-group">
                <label htmlFor="phone">Phone</label>
                <Input
                  id="phone"
                  className="contact-input"
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="cform-group">
                <label htmlFor="orderNumber">Order Number</label>
                <Input
                  id="orderNumber"
                  className="contact-input"
                  type="text"
                  placeholder="Enter order number (if applicable)"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="cform-group">
                <label htmlFor="subject">Subject</label>
                <Input
                  id="subject"
                  className="contact-input"
                  type="text"
                  placeholder="Enter subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="cform-group">
                <label htmlFor="message">Message</label>
                <Textarea
                  id="message"
                  className="contact-input"
                  placeholder="Enter your message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </div>

          {/* Right Section */}
          <div className="contact-info">
            <h2>Get in Touch with Our Bookstore!</h2>
            <p>Have questions about books, orders, or our services? We're here to assist!</p>
            <div className="contact-details">
              <div className="contact-item">
                <MapPinIcon size={24} />
                <span>Great Notes, KPA-3,Sector 133, Noida-201304. </span>
              </div>
              <div className="contact-item">
                <PhoneIcon size={24} />
                <span>+91 6397 969 595</span>
              </div>
              <div className="contact-item">
                <MailIcon size={24} />
                <span>teamgreatnotes@gmail.com</span>
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
              {/* <LinkedinIcon size={24} /> */}
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <>
          <div className="popup-overlay" onClick={() => setShowPopup(false)}></div>
          <div className="popup">
            <button className="close-button" onClick={() => setShowPopup(false)}>&times;</button>
            <h2>Message Sent</h2>
            <p>Your message has been sent successfully. We'll get back to you soon!</p>
          </div>
        </>
      )}
    </div>
  );
}
