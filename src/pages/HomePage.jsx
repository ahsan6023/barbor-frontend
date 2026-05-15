import { Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { deals, salonInfo, treatments } from '../data/treatments'

function PriceTag({ value }) {
  return <span className="price-tag">${value.toFixed(2)}</span>
}

export default function HomePage() {
  const { selectedTreatments, selectedDeals, addTreatment, addDeal } = useBooking()

  return (
    <section className="page-section">
      <div className="owner-panel">
        <div>
          <p className="kicker">Meet The Owner</p>
          <h2>{salonInfo.owner.name}</h2>
          <p className="owner-role">{salonInfo.owner.role}</p>
          <p>{salonInfo.owner.bio}</p>
          <div className="owner-cta-row">
            <Link className="button secondary" to="/bookings">
              Review My Bookings
            </Link>
          </div>
        </div>
        <img src={salonInfo.owner.image} alt="Salon owner" className="owner-image" />
      </div>

      <div className="section-heading">
        <h2>Our Treatments ✂️</h2>
        <p>Select one or more services. They will be added to your bookings page.</p>
      </div>

      <div className="treatments-grid">
        {treatments.map((treatment) => {
          const alreadySelected = selectedTreatments.includes(treatment.id)
          return (
            <article className="service-card" key={treatment.id}>
              <div className="image-wrap">
                <img src={treatment.image} alt={treatment.name} />
              </div>
              <div className="service-content">
                <h3>{treatment.name}</h3>
                <p>{treatment.description}</p>
                <div className="service-footer">
                  <PriceTag value={treatment.price} />
                  <button
                    type="button"
                    className="button"
                    disabled={alreadySelected}
                    onClick={() => addTreatment(treatment.id)}
                  >
                    {alreadySelected ? 'Added' : 'Book Now'}
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="section-heading">
        <h2>Discount Deals 🔥</h2>
        <p>3 combo packages with discounted prices in dollars.</p>
      </div>

      <div className="deals-list">
        {deals.map((deal) => {
          const selected = selectedDeals.includes(deal.id)
          return (
            <details className="deal-accordion" key={deal.id}>
              <summary>
                <span>{deal.name}</span>
                <span className="stars">★★★★★</span>
              </summary>
              <p>{deal.description}</p>
              <ul>
                {deal.treatments.map((item) => (
                  <li key={item.id}>
                    {item.name} - ${item.price}
                  </li>
                ))}
              </ul>
              <p>
                Original: ${deal.originalPrice.toFixed(2)} | Deal: ${deal.discountedPrice.toFixed(2)}
              </p>
              <button
                type="button"
                className="button"
                onClick={() => addDeal(deal.id)}
                disabled={selected}
              >
                {selected ? 'Deal Added' : 'Add Deal'}
              </button>
            </details>
          )
        })}
      </div>
    </section>
  )
}
