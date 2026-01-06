import './Destinations.css'

const Destinations = () => {
  const destinations = [
    {
      id: 1,
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      description: 'The City of Light, known for its art, fashion, and culture.'
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      description: 'A vibrant blend of traditional culture and modern innovation.'
    },
    {
      id: 3,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      description: 'Tropical paradise with stunning beaches and rich culture.'
    },
    {
      id: 4,
      name: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
      description: 'The city that never sleeps, full of energy and opportunities.'
    },
    {
      id: 5,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
      description: 'Breathtaking sunsets and iconic white-washed buildings.'
    },
    {
      id: 6,
      name: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      description: 'Luxury and innovation in the heart of the desert.'
    },
    {
      id: 7,
      name: 'London, UK',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
      description: 'Historic charm meets modern sophistication.'
    },
    {
      id: 8,
      name: 'Sydney, Australia',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      description: 'Stunning harbor views and vibrant city life.'
    }
  ]

  return (
    <div className="destinations">
      <div className="destinations-hero">
        <h1>Explore Amazing Destinations</h1>
        <p>Discover the world's most beautiful places</p>
      </div>
      <div className="container">
        <div className="destinations-grid">
          {destinations.map(dest => (
            <div key={dest.id} className="destination-card">
              <div className="destination-image" style={{ backgroundImage: `url(${dest.image})` }}>
                <div className="destination-overlay"></div>
              </div>
              <div className="destination-content">
                <h3>{dest.name}</h3>
                <p>{dest.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Destinations

