'use client'

import { redirect } from 'next/navigation'

import EventView from 'src/views/EventView'

import { useAuthStore } from '@store/useAuth'
import LoginForm from '@components/LoginForm'
import { useEffect } from 'react'

const App = () => {
  const auth = useAuthStore()

  useEffect(() => {
    if (!auth.isAuthenticated) {
      redirect('/login')
    }
  }, [auth])

  return (
    <>
      <EventView />
    </>
  )
}

export default App
