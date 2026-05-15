/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'
import { deals, treatments } from '../data/treatments'

const BookingContext = createContext(null)

const treatmentMap = Object.fromEntries(treatments.map((treatment) => [treatment.id, treatment]))
const dealMap = Object.fromEntries(deals.map((deal) => [deal.id, deal]))

export function BookingProvider({ children }) {
  const [selectedTreatments, setSelectedTreatments] = useState([])
  const [selectedDeals, setSelectedDeals] = useState([])

  const addTreatment = (treatmentId) => {
    setSelectedTreatments((prev) => {
      if (prev.includes(treatmentId)) return prev
      return [...prev, treatmentId]
    })
  }

  const removeTreatment = (treatmentId) => {
    setSelectedTreatments((prev) => prev.filter((id) => id !== treatmentId))
  }

  const addDeal = (dealId) => {
    setSelectedDeals((prev) => {
      if (prev.includes(dealId)) return prev
      return [...prev, dealId]
    })
  }

  const removeDeal = (dealId) => {
    setSelectedDeals((prev) => prev.filter((id) => id !== dealId))
  }

  const clearAllSelections = () => {
    setSelectedTreatments([])
    setSelectedDeals([])
  }

  const selectedTreatmentDetails = selectedTreatments
    .map((id) => treatmentMap[id])
    .filter(Boolean)
  const selectedDealDetails = selectedDeals.map((id) => dealMap[id]).filter(Boolean)

  const total = useMemo(() => {
    const treatmentTotal = selectedTreatmentDetails.reduce((sum, item) => sum + item.price, 0)
    const dealTotal = selectedDealDetails.reduce((sum, item) => sum + item.discountedPrice, 0)
    return Number((treatmentTotal + dealTotal).toFixed(2))
  }, [selectedTreatmentDetails, selectedDealDetails])

  const value = {
    selectedTreatments,
    selectedDeals,
    selectedTreatmentDetails,
    selectedDealDetails,
    total,
    addTreatment,
    removeTreatment,
    addDeal,
    removeDeal,
    clearAllSelections,
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used inside BookingProvider')
  }
  return context
}
