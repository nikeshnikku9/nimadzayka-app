'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {

  const router = useRouter()

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    // CHANGE PASSWORD HERE
    if (password === 'nimad123') {

      localStorage.setItem('admin-auth', 'true')

      router.push('/admin/dashboard')

    } else {

      setError('Wrong Password')

    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-900 border border-yellow-500 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-2">
          NIMAD ZAYKA
        </h1>

        <p className="text-center text-zinc-300 mb-8">
          Admin Panel Login
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-2xl bg-zinc-800 text-white border border-zinc-600 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-2xl transition"
          >
            Login
          </button>

          {error && (
            <p className="text-red-500 text-center">
              {error}
            </p>
          )}

        </form>

      </div>

    </div>
  )
}
