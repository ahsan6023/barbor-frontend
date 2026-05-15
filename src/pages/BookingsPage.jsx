import { useMemo, useState } from 'react'
import axios from 'axios'
import { useBooking } from '../context/BookingContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function BookingsPage() {
  const {
    selectedTreatmentDetails,
    selectedDealDetails,
    total,
    removeTreatment,
    removeDeal,
    clearAllSelections,
  } = useBooking()

  const [form, setForm] = useState({
    appointmentDate: '',
    phone: '',
    customerName: '',
  })
  const [status, setStatus] = useState({ loading: false, message: '', error: false })

  const selectedCount = selectedTreatmentDetails.length + selectedDealDetails.length

  const hasSelection = useMemo(
    () => selectedTreatmentDetails.length > 0 || selectedDealDetails.length > 0,
    [selectedTreatmentDetails, selectedDealDetails],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!hasSelection) {
      setStatus({ loading: false, message: 'Please select at least one booking from Home page.', error: true })
      return
    }

    try {
      setStatus({ loading: true, message: '', error: false })
      const payload = {
        customerName: form.customerName,
        phone: form.phone,
        appointmentDate: form.appointmentDate,
        treatments: selectedTreatmentDetails,
        deals: selectedDealDetails,
        totalCost: total,
      }

      await axios.post(`${API_URL}/api/bookings`, payload)
      setStatus({
        loading: false,
        message: 'Booking saved to MongoDB successfully.',
        error: false,
      })
      setForm({ appointmentDate: '', phone: '', customerName: '' })
      clearAllSelections()
    } catch (error) {
      setStatus({
        loading: false,
        message: error.response?.data?.message || 'Could not save booking. Please try again.',
        error: true,
      })
    }
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <h2>Booking Summary 🧾</h2>
        <p>Selected services: {selectedCount}</p>
      </div>

      <div className="booking-layout">
        <div className="booking-card">
          <h3>Treatments</h3>
          {selectedTreatmentDetails.length === 0 ? (
            <p>No individual treatments selected yet.</p>
          ) : (
            <ul className="booking-list">
              {selectedTreatmentDetails.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.name} - ${item.price}
                  </span>
                  <button type="button" onClick={() => removeTreatment(item.id)} className="mini-btn">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="booking-card">
          <h3>Deals</h3>
          {selectedDealDetails.length === 0 ? (
            <p>No discounted deals selected yet.</p>
          ) : (
            <ul className="booking-list">
              {selectedDealDetails.map((deal) => (
                <li key={deal.id}>
                  <span>
                    {deal.name} - ${deal.discountedPrice.toFixed(2)}
                  </span>
                  <button type="button" onClick={() => removeDeal(deal.id)} className="mini-btn">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="total-box">Total Cost: ${total.toFixed(2)}</div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <h3>Appointment Details</h3>
        <label>
          Full Name
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </label>
        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+92 300 0000000"
            required
          />
        </label>
        <label>
          Appointment Day
          <input
            type="date"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={handleChange}
            required
          />
        </label>
        <button className="button" type="submit" disabled={status.loading}>
          {status.loading ? 'Submitting...' : 'Submit Booking'}
        </button>
        {status.message ? (
          <p className={status.error ? 'form-message error' : 'form-message'}>{status.message}</p>
        ) : null}
      </form>
    </section>
  )
}
