'use client'

import { useState } from 'react'

export default function AdminPage() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')

  const login = () => {
    if (password === 'nimad123') {
      setLoggedIn(true)
    } else {
      alert('Wrong Password')
    }
  }

  if (loggedIn) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#000',
          color: '#fff',
          padding: '40px',
          fontFamily: 'Arial'
        }}
      >

        <h1 style={{
          fontSize: '42px',
          marginBottom: '30px',
          color: '#facc15'
        }}>
          NIMAD ZAYKA Dashboard
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
          gap: '20px'
        }}>

          <div style={{
            background: '#111',
            padding: '30px',
            borderRadius: '20px'
          }}>
            <h2>Products</h2>
            <p>Manage products</p>
          </div>

          <div style={{
            background: '#111',
            padding: '30px',
            borderRadius: '20px'
          }}>
            <h2>Barcode</h2>
            <p>Create barcodes</p>
          </div>

          <div style={{
            background: '#111',
            padding: '30px',
            borderRadius: '20px'
          }}>
            <h2>QR Codes</h2>
            <p>Generate QR codes</p>
          </div>

        </div>

      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial'
      }}
    >

      <div style={{
        width: '350px',
        background: '#111',
        padding: '40px',
        borderRadius: '20px',
        textAlign: 'center'
      }}>

        <h1 style={{
          color: '#fff',
          fontSize: '38px',
          marginBottom: '10px'
        }}>
          NIMAD ZAYKA
        </h1>

        <p style={{
          color: '#999',
          marginBottom: '30px'
        }}>
          Admin Login
        </p>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            marginBottom: '20px'
          }}
        />

        <button
          onClick={login}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            background: '#dc2626',
            color: '#fff',
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>

      </div>

    </div>
  )
}
