import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>✈️ World Trip</h3>
          <p>Your trusted partner for unforgettable travel experiences around the globe.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="/destinations">Destinations</a></li>
            <li><a href="/packages">Packages</a></li>
            <li><a href="/about-us">About Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@worldtrip.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Travel Street, Tourism City</p>
        </div>
        {/* <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div> */}
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 World Trip. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

