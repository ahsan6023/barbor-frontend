export const salonInfo = {
  name: 'Depilex University Town Peshawar',
  shortDescription:
    'Luxury barber and grooming services for modern gentlemen, delivered with precision and care.',
  owner: {
    name: 'Ahsan Khan',
    role: 'Founder & Master Barber',
    bio: 'Ahsan brings 12+ years of styling experience, blending classic grooming with modern trends. His vision is simple: every client leaves confident, refreshed, and fully styled.',
    image:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1000&q=80',
  },
  aboutImage:
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80',
}

export const treatments = [
  {
    id: 'haircut',
    name: 'Precision Haircut',
    description:
      'Modern fade, layered styling, and face-shape balancing finished with professional blow dry.',
    price: 22,
    image:
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'beard-cut',
    name: 'Beard Sculpt & Trim',
    description:
      'Detailed beard line work, trim, and contouring to sharpen your jawline and style.',
    price: 16,
    image:
      'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'facial',
    name: 'Men Facial Therapy',
    description:
      'Deep cleansing facial designed for men with hydration mask and pore-care treatment.',
    price: 28,
    image:
      'https://images.pexels.com/photos/18704464/pexels-photo-18704464.jpeg',
  },
  {
    id: 'skin-care',
    name: 'Skin Care Refresh',
    description:
      'Exfoliation and nourishing treatment to remove dullness and restore healthy glow.',
    price: 24,
    image:
      'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'hair-color',
    name: 'Hair Color Touch-Up',
    description:
      'Subtle or bold hair tone correction with safe premium products and style finish.',
    price: 35,
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'head-massage',
    name: 'Relaxing Head Massage',
    description:
      'Pressure-point scalp massage to reduce stress, improve circulation, and relax deeply.',
    price: 18,
    image:
      'https://images.pexels.com/photos/17553843/pexels-photo-17553843.jpeg',
  },
  {
    id: 'hot-towel-shave',
    name: 'Hot Towel Royal Shave',
    description:
      'Traditional straight razor shave with hot towel prep and soothing finishing balm.',
    price: 20,
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80',
  },
]

const treatmentMap = Object.fromEntries(treatments.map((treatment) => [treatment.id, treatment]))

export const deals = [
  {
    id: 'gentleman-classic',
    name: 'Gentleman Classic Deal',
    treatmentIds: ['haircut', 'beard-cut', 'hot-towel-shave'],
    discountPercent: 20,
  },
  {
    id: 'skin-revive-pack',
    name: 'Skin Revive Deal',
    treatmentIds: ['facial', 'skin-care', 'head-massage'],
    discountPercent: 25,
  },
  {
    id: 'premium-style-pack',
    name: 'Premium Style Deal',
    treatmentIds: ['haircut', 'hair-color', 'beard-cut'],
    discountPercent: 18,
  },
].map((deal) => {
  const originalPrice = deal.treatmentIds.reduce(
    (sum, treatmentId) => sum + treatmentMap[treatmentId].price,
    0,
  )
  const discountedPrice = Number((originalPrice * (1 - deal.discountPercent / 100)).toFixed(2))

  return {
    ...deal,
    originalPrice,
    discountedPrice,
    treatments: deal.treatmentIds.map((id) => treatmentMap[id]),
    description: `${deal.discountPercent}% off when you book these 3 treatments together.`,
  }
})
