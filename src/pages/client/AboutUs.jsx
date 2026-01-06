import './AboutUs.css'

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-hero">
        <h1>About World Trip</h1>
        <p>Your trusted partner for unforgettable travel experiences</p>
      </div>
      
      <div className="container">
        <section className="about-intro">
          <div className="intro-content">
            <h2>Welcome to World Trip</h2>
            <p>
              At World Trip, we believe that travel is not just about visiting new places—it's about 
              creating memories that last a lifetime. Since our founding, we've been dedicated to 
              providing exceptional travel experiences that combine adventure, comfort, and cultural 
              immersion.
            </p>
            <p>
              Our team of travel experts works tirelessly to curate the best packages, ensuring that 
              every journey is unique, memorable, and tailored to your preferences. Whether you're 
              seeking a relaxing beach getaway, an adventurous mountain trek, or a cultural city tour, 
              we have the perfect package for you.
            </p>
          </div>
        </section>

        <section className="mission-vision">
          <div className="mission-card">
            <div className="card-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To make world-class travel experiences accessible to everyone, while promoting 
              sustainable tourism and cultural understanding across the globe.
            </p>
          </div>
          <div className="vision-card">
            <div className="card-icon">👁️</div>
            <h3>Our Vision</h3>
            <p>
              To become the world's most trusted travel partner, inspiring millions to explore, 
              discover, and connect with diverse cultures and breathtaking destinations.
            </p>
          </div>
        </section>

        <section className="values">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h3>Excellence</h3>
              <p>We strive for excellence in every aspect of our service, from planning to execution.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Integrity</h3>
              <p>We conduct our business with honesty, transparency, and ethical practices.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Customer First</h3>
              <p>Your satisfaction and happiness are at the heart of everything we do.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>We are committed to responsible tourism that protects our planet for future generations.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Cultural Respect</h3>
              <p>We promote cultural understanding and respect for local communities and traditions.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Innovation</h3>
              <p>We continuously innovate to provide better travel experiences and services.</p>
            </div>
          </div>
        </section>

        <section className="why-choose-us">
          <h2>Why Choose World Trip?</h2>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-number">01</div>
              <div className="feature-content">
                <h3>Expert Travel Planning</h3>
                <p>Our experienced travel consultants have visited destinations worldwide and can provide insider tips and recommendations.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-number">02</div>
              <div className="feature-content">
                <h3>Best Price Guarantee</h3>
                <p>We offer competitive prices and ensure you get the best value for your money without compromising on quality.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-number">03</div>
              <div className="feature-content">
                <h3>24/7 Support</h3>
                <p>Our dedicated support team is available round the clock to assist you before, during, and after your trip.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-number">04</div>
              <div className="feature-content">
                <h3>Customizable Packages</h3>
                <p>Every traveler is unique, and so are our packages. We offer flexible itineraries that can be tailored to your preferences.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-number">05</div>
              <div className="feature-content">
                <h3>Trusted Partners</h3>
                <p>We work with verified hotels, airlines, and local guides to ensure safe and comfortable travel experiences.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-number">06</div>
              <div className="feature-content">
                <h3>Memorable Experiences</h3>
                <p>We go beyond typical tourist attractions to create authentic experiences that connect you with local culture.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Happy Travelers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Destinations</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Travel Packages</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Years of Experience</div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutUs

