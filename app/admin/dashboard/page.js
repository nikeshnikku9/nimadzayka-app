'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn')

    if (!loggedIn) {
      router.push('/admin')
    }
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        padding: '40px',
      }}
    >
      <h1 style={{ fontSize: '40px', marginBottom: '30px' }}>
        NIMAD ZAYKA Dashboard
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
          gap: '20px',
        }}
      >
        <div
          style={{
            background: '#111',
            padding: '30px',
            borderRadius: '20px',
          }}
        >
          <h2>Products</h2>
          <p>Manage spice products</p>
        </div>

        <div
          style={{
            background: '#111',
            padding: '30px',
            borderRadius: '20px',
          }}
        >
          <h2>Barcode</h2>
          <p>Create product barcodes</p>
        </div>

        <div
          style={{
            background: '#111',
            padding: '30px',
            borderRadius: '20px',
          }}
        >
          <h2>Orders</h2>
          <p>Manage enquiries/orders</p>
        </div>
      </div>
    </div>
  )
}
