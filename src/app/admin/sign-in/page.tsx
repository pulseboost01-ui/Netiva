'use client'

import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'

export default function AdminSignInPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const form = new FormData(event.currentTarget)
    const result = await signIn('credentials', {
      email: form.get('email'),
      password: form.get('password'),
      callbackUrl: '/admin',
      redirect: false,
    })
    if (result?.error) setError('Invalid admin credentials or password is not configured.')
    else window.location.assign('/admin')
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-chalk px-5 py-20">
      <div className="mx-auto max-w-md border border-chalk-line bg-white p-8 text-center shadow-sm">
        <p className="scoreline text-sm uppercase text-turf">Private area</p>
        <h1 className="mt-3">Admin sign in</h1>
        <p className="mt-4 text-sm text-ink-soft">Sign in with the approved administrator email and password.</p>
        <form onSubmit={handleSubmit} autoComplete="off" className="mt-8 space-y-3 text-left">
          <label className="block text-sm font-semibold text-ink">Email<input name="email" type="email" required autoComplete="off" className="mt-1 w-full" /></label>
          <label className="block text-sm font-semibold text-ink">Password<input name="password" type="password" required autoComplete="new-password" className="mt-1 w-full" /></label>
          {error && <p className="text-sm text-card-red">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded bg-pitch px-5 py-3 font-semibold text-white hover:bg-pitch-light disabled:opacity-60">{loading ? 'Signing in...' : 'Sign in'}</button>
        </form>
      </div>
    </main>
  )
}
