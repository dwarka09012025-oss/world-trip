import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import './Packages.css'

const Packages = () => {
  const { packages, user, placeOrder } = useApp()
  const navigate = useNavigate()
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [showBookingPage, setShowBookingPage] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    travelDate: '',
    numberOfTravelers: 1,
    specialRequests: '',
    address: '',
    city: '',
    country: '',
    passportNumber: ''
  })

  const handleBookNow = (pkg) => {
    if (!user) {
      alert('Please login to book a package')
      return
    }
    setSelectedPackage(pkg)
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: '',
      travelDate: '',
      numberOfTravelers: 1,
      specialRequests: '',
      address: '',
      city: '',
      country: '',
      passportNumber: ''
    })
    setShowBookingPage(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone || !formData.travelDate) {
      alert('Please fill all required fields')
      return
    }
    if (!selectedPackage) {
      alert('No package selected')
      return
    }
    try {
      await placeOrder(selectedPackage.id, selectedPackage, formData)
      alert('Booking confirmed successfully! Your order has been placed.')
      setShowBookingPage(false)
      setSelectedPackage(null)
      // Redirect to My Orders page after successful booking
      navigate('/my-orders')
    } catch (error) {
      console.error('Order placement error:', error)
      const errorMessage = error.message || 'Failed to place order. Please try again.'
      alert(`Error: ${errorMessage}\n\nIf the backend server is not running, the order will be saved locally.`)
    }
  }

  const calculateTotal = () => {
    if (!selectedPackage) return 0
    return selectedPackage.price * (formData.numberOfTravelers || 1)
  }

  // Filter packages based on search query
  const filteredPackages = useMemo(() => {
    if (!packages || packages.length === 0) return []
    
    if (!searchQuery.trim()) {
      return packages
    }

    // Filter packages based on name, destination, or description
    const query = searchQuery.toLowerCase().trim()
    return packages.filter(pkg => 
      pkg.name?.toLowerCase().includes(query) ||
      pkg.destination?.toLowerCase().includes(query) ||
      pkg.description?.toLowerCase().includes(query)
    )
  }, [packages, searchQuery])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  const scrollToResults = () => {
    const resultsSection = document.getElementById('packages-results-section')
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (showBookingPage && selectedPackage) {
    return (
      <div className="booking-page">
        <div className="booking-container">
          <div className="booking-header">
            <button onClick={() => setShowBookingPage(false)} className="back-btn">← Back to Packages</button>
            <h1>Complete Your Booking</h1>
            <p>Fill in the details to confirm your travel package</p>
          </div>

          <div className="booking-content">
            <div className="booking-package-info">
              <div className="package-preview">
                <div className="preview-image" style={{ backgroundImage: `url(${selectedPackage.image})` }}></div>
                <div className="preview-details">
                  <h2>{selectedPackage.name}</h2>
                  <p className="preview-destination">📍 {selectedPackage.destination}</p>
                  <p className="preview-duration">⏱️ {selectedPackage.duration}</p>
                  <p className="preview-description">{selectedPackage.description}</p>
                  <div className="preview-included">
                    <h4>What's Included:</h4>
                    <ul>
                      {selectedPackage.included.map((item, index) => (
                        <li key={index}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="preview-price">
                    <span className="price-label">Package Price:</span>
                    <span className="price-amount">₹{selectedPackage.price} per person</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="booking-form-section">
              <h3>Traveler Information</h3>
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name <span className="required">*</span></label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address <span className="required">*</span></label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number <span className="required">*</span></label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="form-group">
                    <label>Passport Number</label>
                    <input
                      type="text"
                      value={formData.passportNumber}
                      onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                      placeholder="Enter passport number"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Travel Date <span className="required">*</span></label>
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Number of Travelers <span className="required">*</span></label>
                    <input
                      type="number"
                      value={formData.numberOfTravelers}
                      onChange={(e) => setFormData({ ...formData, numberOfTravelers: parseInt(e.target.value) || 1 })}
                      required
                      min="1"
                      max="10"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street address"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                    />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Special Requests or Notes</label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    rows="4"
                    placeholder="Any special requests, dietary requirements, or additional information..."
                  ></textarea>
                </div>

                <div className="booking-summary">
                  <div className="summary-row">
                    <span>Package Price (per person):</span>
                    <span>₹{selectedPackage.price}</span>
                  </div>
                  <div className="summary-row">
                    <span>Number of Travelers:</span>
                    <span>{formData.numberOfTravelers}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Amount:</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>

                <div className="booking-footer">
                  <button type="button" onClick={() => setShowBookingPage(false)} className="btn-cancel">
                    Cancel
                  </button>
                  <button type="submit" className="btn-confirm">
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (packages.length === 0) {
    return (
      <div className="packages-page">
        <div className="packages-hero">
          <h1>Travel Packages</h1>
          <p>Choose your perfect adventure</p>
        </div>
        <div className="container">
          <div className="no-packages">
            <div className="loading-spinner">⏳</div>
            <h2>Loading Packages...</h2>
            <p>Please wait while we load the available travel packages.</p>
            <p className="error-note">If packages don't load, make sure the backend server is running on http://localhost:5000</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="packages-page">
      <div className="packages-hero">
        <h1>Travel Packages</h1>
        <p>Choose your perfect adventure</p>
      </div>

      {/* Search Bar Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-bar-container">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              className="search-input"
              placeholder="Search packages by name, destination, or description..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={handleClearSearch}>
                ✕
              </button>
            )}
          </div>
          {searchQuery && filteredPackages.length > 0 && (
            <div className="search-results-info-wrapper">
              <button 
                className="search-results-info clickable" 
                onClick={scrollToResults}
                title="Click to view search results"
              >
                <span className="results-count">Found {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''}</span>
                <span className="results-query">matching "{searchQuery}"</span>
                <span className="view-results-arrow">↓ View Results</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <div id="packages-results-section" className="container">
        {filteredPackages.length === 0 && searchQuery ? (
          <div className="no-results">
            <p>No packages found matching your search. Try a different keyword.</p>
          </div>
        ) : (
          <div className="packages-grid">
            {filteredPackages.map(pkg => (
            <div key={pkg.id} className={`package-card ${searchQuery ? 'search-result-card' : ''}`}>
              <div className="package-image-container">
                <div className="package-image" style={{ backgroundImage: `url(${pkg.image})` }}>
                  <div className="package-overlay"></div>
                  {searchQuery && <div className="package-badge search-badge">Match</div>}
                </div>
                <div className="package-price-display">
                  <span className="price-currency">₹</span>
                  <span className="price-value">{pkg.price}</span>
                  <span className="price-unit">/person</span>
                </div>
              </div>
              <div className="package-content">
                <div className="package-header">
                  <h3>{pkg.name}</h3>
                  <p className="package-destination">📍 {pkg.destination}</p>
                  <p className="package-duration">⏱️ {pkg.duration}</p>
                </div>
                <p className="package-description">{pkg.description}</p>
                <div className="package-included">
                  <h4>What's Included:</h4>
                  <ul>
                    {pkg.included.map((item, index) => (
                      <li key={index}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="package-footer">
                  <button onClick={() => handleBookNow(pkg)} className="book-now-btn">
                    Book Now →
                  </button>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Packages

