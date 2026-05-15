import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { BookingProvider } from './context/BookingContext'
import AdminPage from './pages/AdminPage'
import AboutPage from './pages/AboutPage'
import BookingsPage from './pages/BookingsPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BookingProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Layout>
    </BookingProvider>
  )
}

export default App
