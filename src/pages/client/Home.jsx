import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import './Home.css'

const Home = () => {
  const { packages } = useApp()
  const featuredPackages = packages && packages.length > 0 ? packages.slice(0, 3) : []

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Next Adventure</h1>
          <p className="hero-subtitle">Explore breathtaking destinations and create unforgettable memories with World Trip</p>
          <Link to="/packages" className="hero-cta">Explore Packages</Link>
        </div>
        <div className="hero-image">
          <div className="hero-overlay"></div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose World Trip?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Worldwide Destinations</h3>
              <p>Explore amazing places across the globe</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing for all budgets</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Expert Guides</h3>
              <p>Professional travel assistance</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Safe Travel</h3>
              <p>Your safety is our priority</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-packages">
        <div className="container">
          <h2 className="section-title">Featured Packages</h2>
          <div className="packages-grid">
            {featuredPackages.map(pkg => (
              <div key={pkg.id} className="package-card">
                <div className="package-image-container">
                  <div 
                    className="package-image" 
                    style={{ 
                      backgroundImage: `url(${pkg.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'})` 
                    }}
                  >
                    <div className="package-overlay"></div>
                    <div className="package-badge">Featured</div>
                  </div>
                </div>
                <div className="package-content">
                  <h3 className="package-title">{pkg.name}</h3>
                  <div className="package-info">
                    <p className="package-destination">
                      <span className="info-icon">📍</span>
                      {pkg.destination}
                    </p>
                    <p className="package-duration">
                      <span className="info-icon">⏱️</span>
                      {pkg.duration}
                    </p>
                  </div>
                  {pkg.description && (
                    <p className="package-description">{pkg.description}</p>
                  )}
                  {pkg.included && pkg.included.length > 0 && (
                    <div className="package-included-preview">
                      <span className="included-label">Includes:</span>
                      <span className="included-items">
                        {pkg.included.slice(0, 2).join(', ')}
                        {pkg.included.length > 2 && ` +${pkg.included.length - 2} more`}
                      </span>
                    </div>
                  )}
                  <div className="package-footer">
                    <div className="package-price-wrapper">
                      <span className="package-price">₹{pkg.price}</span>
                      <span className="price-label">per person</span>
                    </div>
                    <Link to="/packages" className="package-btn">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all">
            <Link to="/packages" className="btn-primary">View All Packages</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

