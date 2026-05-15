import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'https://barbor-backend.onrender.com'

export default function AdminPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_URL}/api/bookings`)
        setBookings(response.data.bookings || [])
        setError('')
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || 'Could not fetch bookings.')
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading">
        <h2>Admin Dashboard 📊</h2>
        <p>All appointments stored in MongoDB.</p>
      </div>

      {loading ? <p className="admin-state">Loading bookings...</p> : null}
      {error ? <p className="admin-state error">{error}</p> : null}

      {!loading && !error ? (
        <div className="admin-grid">
          {bookings.length === 0 ? (
            <p className="admin-state">No bookings found yet.</p>
          ) : (
            bookings.map((booking) => (
              <article className="admin-card" key={booking._id}>
                <h3>{booking.customerName}</h3>
                <p>📱 {booking.phone}</p>
                <p>📅 {new Date(booking.appointmentDate).toLocaleDateString()}</p>
                <p>💵 Total: ${booking.totalCost.toFixed(2)}</p>

                <div className="admin-list-wrap">
                  <h4>Treatments</h4>
                  {booking.treatments?.length ? (
                    <ul>
                      {booking.treatments.map((item) => (
                        <li key={`${booking._id}-${item.id}`}>{item.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>-</p>
                  )}
                </div>

                <div className="admin-list-wrap">
                  <h4>Deals</h4>
                  {booking.deals?.length ? (
                    <ul>
                      {booking.deals.map((deal) => (
                        <li key={`${booking._id}-${deal.id}`}>{deal.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      ) : null}
    </section>
  )
}
