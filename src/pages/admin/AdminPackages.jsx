import { useState, useRef } from 'react'
import { useApp } from '../../context/AppContext'
import './AdminPackages.css'

const AdminPackages = () => {
  const { packages, addPackage, updatePackage, deletePackage } = useApp()
  const [showModal, setShowModal] = useState(false)
  const [editingPackage, setEditingPackage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    duration: '',
    price: '',
    image: '',
    description: '',
    included: ''
  })

  const handleAddNew = () => {
    setEditingPackage(null)
    setImagePreview('')
    setFormData({
      name: '',
      destination: '',
      duration: '',
      price: '',
      image: '',
      description: '',
      included: ''
    })
    setShowModal(true)
  }

  const handleEdit = (pkg) => {
    setEditingPackage(pkg)
    setImagePreview(pkg.image || '')
    setFormData({
      name: pkg.name,
      destination: pkg.destination,
      duration: pkg.duration,
      price: pkg.price.toString(),
      image: pkg.image,
      description: pkg.description,
      included: pkg.included.join(', ')
    })
    setShowModal(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.match('image.(jpg|jpeg|png)')) {
        alert('Please select a valid image file (JPG or PNG)')
        e.target.value = ''
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        e.target.value = ''
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setFormData({ ...formData, image: base64String })
        setImagePreview(base64String)
      }
      reader.onerror = () => {
        alert('Error reading image file')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.destination || !formData.duration || !formData.price || !formData.image || !formData.description || !formData.included) {
      alert('Please fill all required fields')
      return
    }

    const packageData = {
      name: formData.name.trim(),
      destination: formData.destination.trim(),
      duration: formData.duration.trim(),
      price: parseFloat(formData.price),
      image: formData.image,
      description: formData.description.trim(),
      included: formData.included.split(',').map(item => item.trim()).filter(item => item.length > 0)
    }

    // Validate price
    if (isNaN(packageData.price) || packageData.price <= 0) {
      alert('Please enter a valid price')
      return
    }

    // Validate included items
    if (packageData.included.length === 0) {
      alert('Please enter at least one included item')
      return
    }

    try {
      if (editingPackage) {
        await updatePackage(editingPackage.id, packageData)
        alert('Package updated successfully!')
      } else {
        await addPackage(packageData)
        alert('Package added successfully!')
      }
      setShowModal(false)
      setEditingPackage(null)
      setImagePreview('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error saving package:', error)
      alert(`Failed to save package: ${error.message || 'Please try again.'}`)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(id)
        alert('Package deleted successfully!')
      } catch (error) {
        console.error('Delete error:', error)
        const errorMessage = error.message || 'Failed to delete package. Please try again.'
        alert(`Error: ${errorMessage}`)
      }
    }
  }

  return (
    <div className="admin-packages">
      <div className="admin-page-header">
        <h1>Manage Packages</h1>
        <button onClick={handleAddNew} className="btn-add">+ Add New Package</button>
      </div>

      <div className="packages-table-container">
        <table className="packages-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Destination</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">No packages found</td>
              </tr>
            ) : (
              packages.map(pkg => (
                <tr key={pkg.id}>
                  <td>
                    <div className="package-thumbnail" style={{ backgroundImage: `url(${pkg.image})` }}></div>
                  </td>
                  <td>{pkg.name}</td>
                  <td>{pkg.destination}</td>
                  <td>{pkg.duration}</td>
                  <td>${pkg.price}</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(pkg)} className="btn-edit">Edit</button>
                      <button onClick={() => handleDelete(pkg.id)} className="btn-delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingPackage ? 'Edit Package' : 'Add New Package'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Package Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 7 Days"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Image (JPG or PNG)</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleImageChange}
                  required={!editingPackage}
                />
                {imagePreview && (
                  <div style={{ marginTop: '10px' }}>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{ 
                        maxWidth: '200px', 
                        maxHeight: '150px', 
                        borderRadius: '8px',
                        border: '1px solid #ddd'
                      }} 
                    />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>What's Included (comma separated)</label>
                <input
                  type="text"
                  value={formData.included}
                  onChange={(e) => setFormData({ ...formData, included: e.target.value })}
                  placeholder="Hotel, Breakfast, City Tour"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingPackage ? 'Update' : 'Add'} Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPackages

