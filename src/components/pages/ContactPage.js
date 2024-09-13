'use client'

import { useState } from 'react'
import { Button } from "./ui/Button.js"
import { Input } from "./ui/Input.js"
import { Textarea } from "./ui/Textarea.js"
import './ui/Contact.css'
import { MapPinIcon, PhoneIcon, MailIcon, FacebookIcon, TwitterIcon, LinkedinIcon } from "lucide-react"

export default function ContactPage() {
  const [hoverStates, setHoverStates] = useState({
    name: false,
    email: false,
    message: false,
  })

  const handleHover = (field, isHovering) => {
    setHoverStates(prev => ({ ...prev, [field]: isHovering }))
  }

  return (
    <div className="contact-wrapper">
      <div className="container">
        <div className="contact-wrapper">
          {/* Left Section */}
          <div className="contact-form">
            <h1>Contact Us</h1>
            <p>We're here to help you!</p>
            <form>
              <div className="form-group">
                <Input 
                  placeholder="Name" 
                  onMouseEnter={() => handleHover('name', true)}
                  onMouseLeave={() => handleHover('name', false)}
                />
              </div>
              <div className="form-group">
                <Input 
                  type="email" 
                  placeholder="Email" 
                  onMouseEnter={() => handleHover('email', true)}
                  onMouseLeave={() => handleHover('email', false)}
                />
              </div>
              <div className="form-group">
                <Textarea 
                  placeholder="Message" 
                  onMouseEnter={() => handleHover('message', true)}
                  onMouseLeave={() => handleHover('message', false)}
                />
              </div>
              <Button>
                Send Message
              </Button>
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
              <FacebookIcon size={24} />
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
  )
}