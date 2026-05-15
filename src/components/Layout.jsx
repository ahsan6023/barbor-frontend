import { NavLink } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'
import { salonInfo } from '../data/treatments'

const navItems = [
  { to: '/', label: 'Home 🏠' },
  { to: '/bookings', label: 'Bookings 📅' },
  { to: '/about', label: 'About ✨' },
  { to: '/admin', label: 'Admin 📊' },
]

export default function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <p className="kicker">Premium Barber Salon</p>
          <h1>{salonInfo.name}</h1>
          <p>{salonInfo.shortDescription}</p>
          <p className="header-badge">Luxury Grooming Experience 💈</p>
        </div>
      </header>

      <nav className="navbar">
        <div className="container nav-inner">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="container">{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h3>{salonInfo.name}</h3>
            <p>University Town, Peshawar, Pakistan</p>
          </div>
          <div>
            <h3>Contact</h3>
            <p>+92 300 1112223</p>
            <p>+92 91 1234567</p>
            <p>hello@depilexutown.com</p>
          </div>
          <div>
            <h3>Social</h3>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link">
              <FaInstagram /> Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link">
              <FaFacebookF /> Facebook
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-link">
              <FaTiktok /> TikTok
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
