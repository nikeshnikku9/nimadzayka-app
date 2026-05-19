'use client'

import { useState } from 'react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = () => {
    if (password === 'nimad123') {
      setLoggedIn(true)
    } else {
      alert('Wrong Password')
    }
  }

  if (loggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#111',
        color: 'white',
        padding: '40px'
      }}>
        <h1>Admin Panel</h1>
        <p>Welcome to Nimad ZAYKA Admin Dashboard</p>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#000',
      color: '#fff',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h1>Nimad ZAYKA Admin</h1>

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: '12px',
          borderRadius: '10px',
          border: 'none',
          width: '250px'
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          padding: '12px 25px',
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer'
        }}
      >
        Login
      </button>
    </div>
  )
}
