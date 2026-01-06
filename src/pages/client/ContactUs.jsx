import { useState } from 'react'
import './ContactUs.css'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="contact-us">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We're here to help you plan your perfect trip</p>
      </div>
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">📧</div>
                <h3>Email</h3>
                <p>info@worldtrip.com</p>
                <p>support@worldtrip.com</p>
              </div>
              <div className="info-card">
                <div className="info-icon">📞</div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
                <p>+1 (555) 987-6543</p>
              </div>
              <div className="info-card">
                <div className="info-icon">📍</div>
                <h3>Address</h3>
                <p>123 Travel Street</p>
                <p>Tourism City, TC 12345</p>
              </div>
            </div>

            <div className="business-hours">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="6"
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs

