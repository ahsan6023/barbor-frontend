import { salonInfo } from '../data/treatments'

export default function AboutPage() {
  return (
    <section className="page-section">
      <div className="about-layout">
        <div>
          <p className="kicker">About Us</p>
          <h2>Where precision meets personality 💎</h2>
          <p>
            {salonInfo.name} is designed for clients who value clean style, high hygiene standards, and
            a relaxing premium atmosphere. We focus on custom results instead of one-size-fits-all
            grooming.
          </p>
          <p>
            Our barbers are trained in modern techniques, classic finishing, and skin-safe product use.
            Every appointment is planned around your preferences, face structure, and lifestyle.
          </p>
          
        </div>
        <img src={salonInfo.aboutImage} alt="Inside salon workspace" className="about-image" />
      </div>
    </section>
  )
}
