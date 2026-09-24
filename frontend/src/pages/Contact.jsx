 
import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    alert('Please fill in all fields.')
    return
  }

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()

    if (response.ok) {
      setSuccess('✅ Message sent successfully!')

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } else {
      alert(data.message || 'Failed to send message.')
    }

  } catch (error) {
    console.error('Contact form error:', error)
    alert('Unable to connect to the server.')
  }
}

  return (
    <main>
      <section className="contact-section">

        <h1>Contact Us</h1>

        <p className="section-text">
          Have a question? We would love to hear from you.
        </p>

        <div className="contact-grid">

          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <h2>Email</h2>
            <p>support@hastashopeasy.com</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <h2>Phone</h2>
            <p>+91 93424 38683</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h2>Location</h2>
            <p>Tamil Nadu, India</p>
          </div>

        </div>

        <form className="contact-form" onSubmit={handleSubmit}>

          <h2>Send Us a Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <textarea
            name="message"
            rows="6"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="add-cart">
            Send Message →
          </button>

          {success && (
            <p className="success-message">
              {success}
            </p>
          )}

        </form>

      </section>
    </main>
  )
}

export default Contact

