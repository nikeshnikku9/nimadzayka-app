'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (password === 'nimad123') {
      localStorage.setItem('adminLoggedIn', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('Wrong Password')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
      }}
    >
      <div
        style={{
          background: '#111',
          padding: '40px',
          borderRadius: '20px',
          width: '350px',
          textAlign: 'center',
          border: '1px solid #333',
        }}
      >
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>
          NIMAD ZAYKA
        </h1>

        <p style={{ marginBottom: '30px', color: '#aaa' }}>
          Admin Panel Login
        </p>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            marginBottom: '20px',
            outline: 'none',
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            background: '#c1121f',
            color: '#fff',
            fontSize: '18px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>

        {error && (
          <p style={{ color: 'red', marginTop: '15px' }}>
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
